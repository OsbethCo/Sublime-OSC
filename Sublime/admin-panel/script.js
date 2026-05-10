const apiBase = '../api';
let donutChart = null;
let lineChart = null;
let dashboardData = { topProducts: [], totalIncome: 0 };
let cart = [];
const donut = document.getElementById('donutChart');
const line = document.getElementById('lineChart');

function apiRequest(endpoint, options = {}) {
    const url = `${apiBase}/${endpoint}`;
    if (!options.method) options.method = 'GET';
    if (options.body) {
        options.headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        };
        options.body = JSON.stringify(options.body);
    }
    return fetch(url, options).then(async response => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.message || 'Error en la petición');
        }
        return data;
    });
}

function formatCurrency(value) {
    return `$${Number(value || 0).toFixed(2)}`;
}

function renderBarsAnimation() {
    document.querySelectorAll('.progress div').forEach(bar => {
        let width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

async function loadDashboard() {
    try {
        const response = await apiRequest('dashboard');
        const stats = response.stats || {};
        dashboardData = response;
        dashboardData.totalIncome = stats.totalIncome || 0;
        document.getElementById('salesCount').textContent = stats.totalSales || 0;
        document.getElementById('incomeValue').textContent = formatCurrency(stats.totalIncome);
        document.getElementById('stockValue').textContent = stats.totalStock || 0;
        document.getElementById('clientCount').textContent = stats.totalClients || 0;
        if (response.categories?.length) createDonutChart(response.categories);
        if (response.monthly?.length) createLineChart(response.monthly);
        if (response.topProducts?.length) updateTopProducts(response.topProducts);
    } catch (error) {
        console.error('Error cargando dashboard:', error);
    }
}

function updateTopProducts(products) {
    const container = document.querySelector('.products-box');
    if (!container) return;
    container.innerHTML = `<h3>Top 10 Productos por Ventas</h3>${products.slice(0, 5).map(prod => {
        const width = Math.min(100, Math.max(10, Math.round((prod.cantidad || 0) * 5)));
        return `
            <div class="bar">
                <span>${prod.producto}</span>
                <div class="progress"><div style="width:${width}%"></div></div>
                <b>${formatCurrency(prod.total)}</b>
            </div>`;
    }).join('')}`;
}

function createDonutChart(categories) {
    const labels = categories.map(item => item.categoria || 'Sin categoría');
    const values = categories.map(item => item.stock || 0);
    const colors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];
    if (donutChart) {
        donutChart.data.labels = labels;
        donutChart.data.datasets[0].data = values;
        donutChart.update();
        return;
    }
    donutChart = new Chart(donut, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: colors.slice(0, values.length),
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: { legend: { display: false } }
        }
    });
}

function createLineChart(monthly) {
    const months = monthly.map(item => item.mes || '00');
    const totals = monthly.map(item => Number(item.total || 0));
    const gastos = totals.map(value => Number(value * 0.4));
    if (lineChart) {
        lineChart.data.labels = months;
        lineChart.data.datasets[0].data = totals;
        lineChart.data.datasets[1].data = gastos;
        lineChart.update();
        return;
    }
    lineChart = new Chart(line, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Ganancias',
                    data: totals,
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34,197,94,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: 'Gastos',
                    data: gastos,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239,68,68,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: { legend: { position: 'bottom' } },
            scales: { x: { grid: { display: false } }, y: { grid: { color: '#eee' } } }
        }
    });
}

async function loadInventory() {
    try {
        const response = await apiRequest('inventory');
        const body = document.getElementById('inventoryTableBody');
        if (!body) return;
        body.innerHTML = response.inventory.map(item => `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.categoria || 'Sin categoría'}</td>
                <td>${formatCurrency(item.precio)}</td>
                <td>${item.stock}</td>
                <td>Editar / Eliminar</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error cargando inventario:', error);
    }
}

async function loadClients() {
    try {
        const response = await apiRequest('clients');
        const container = document.getElementById('clientsList');
        if (!container) return;
        container.innerHTML = response.clients.map(client => {
            const initials = client.nombre ? client.nombre.charAt(0).toUpperCase() : 'C';
            return `
                <div class="client-card">
                    <div class="client-avatar">${initials}</div>
                    <div>
                        <h3>${client.nombre}</h3>
                        <p>${client.correo || ''}</p>
                        <p>${client.telefono || ''}</p>
                        <p>${client.direccion || ''}</p>
                    </div>
                </div>`;
        }).join('');
    } catch (error) {
        console.error('Error cargando clientes:', error);
    }
}

async function loadInvoices() {
    try {
        const response = await apiRequest('invoices');
        const body = document.getElementById('invoicesTableBody');
        if (!body) return;
        body.innerHTML = response.invoices.map(invoice => `
            <tr>
                <td>INV-${String(invoice.id).padStart(3, '0')}</td>
                <td>${invoice.cliente || 'Cliente desconocido'}</td>
                <td>${new Date(invoice.fecha).toLocaleDateString('es-VE')}</td>
                <td>${invoice.items} producto(s)</td>
                <td>${formatCurrency(invoice.total)}</td>
                <td>Ver Detalle</td>
            </tr>`).join('');
    } catch (error) {
        console.error('Error cargando facturas:', error);
    }
}

async function loadSalesData() {
    try {
        const response = await apiRequest('sales-data');
        const clientSelect = document.getElementById('salesClientSelect');
        const productsContainer = document.getElementById('productCardsContainer');
        if (!clientSelect || !productsContainer) return;
        clientSelect.innerHTML = `<option value="">Seleccionar cliente...</option>${response.clients.map(client => `
            <option value="${client.id_cliente}">${client.nombre}</option>`).join('')}`;
        productsContainer.innerHTML = response.products.map(product => `
            <div class="product-card" data-id="${product.id_producto}" data-name="${product.nombre}" data-price="${product.precio}">
                <strong>${product.nombre}</strong>
                <p>${formatCurrency(product.precio)} · Stock: ${product.stock}</p>
                <button type="button" class="add-cart">Agregar</button>
            </div>`).join('');
        productsContainer.querySelectorAll('.add-cart').forEach(button => {
            button.addEventListener('click', event => {
                const card = event.target.closest('.product-card');
                if (!card) return;
                addToCart({ id: card.dataset.id, nombre: card.dataset.name, precio: Number(card.dataset.price) });
            });
        });
    } catch (error) {
        console.error('Error cargando datos de ventas:', error);
    }
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.cantidad += 1;
    } else {
        cart.push({ ...product, cantidad: 1 });
    }
    renderCart();
}

function renderCart() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;
    if (!cart.length) {
        cartContent.innerHTML = '<p>Carrito vacío</p>';
        return;
    }
    cartContent.innerHTML = cart.map(item => `
        <div class="cart-item">
            <strong>${item.nombre}</strong>
            <p>Cantidad: ${item.cantidad} • ${formatCurrency(item.precio)} c/u</p>
        </div>`).join('');
}

window.addEventListener('DOMContentLoaded', async () => {
    renderBarsAnimation();
    await Promise.all([loadDashboard(), loadInventory(), loadClients(), loadInvoices(), loadSalesData()]);
});

// =====================
// NAVEGACIÓN DE SECCIONES
// =====================
const menuItems = document.querySelectorAll('.sidebar li[data-section]');
const sections = document.querySelectorAll('.page-section');
const pageTitle = document.getElementById('pageTitle');

const loggedUser = (() => {
    const value = sessionStorage.getItem('sublimeUser');
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
})();

if (!loggedUser) {
    window.location.href = '../login/index.html';
}

const sectionTitles = {
    dashboard: 'Bienvenido, Admin!',
    inventory: 'Inventario',
    sales: 'Ventas',
    clients: 'Clientes',
    invoices: 'Facturas',
    settings: 'Configuración'
};

if (pageTitle && loggedUser) {
    pageTitle.textContent = `Bienvenido, ${loggedUser.nombre}`;
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('sublimeUser');
        window.location.href = '../login/index.html';
    });
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.dataset.section;
        menuItems.forEach(menu => menu.classList.remove('active'));
        item.classList.add('active');
        sections.forEach(section => {
            section.classList.toggle('active', section.id === target);
        });
        pageTitle.textContent = sectionTitles[target] || 'Panel';
    });
});

const settingsTabs = document.querySelectorAll('.settings-tab-button');
const settingsPanels = document.querySelectorAll('.settings-panel');
const darkModeToggle = document.getElementById('darkModeToggle');
const themeModeText = document.getElementById('themeModeText');

settingsTabs.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.dataset.config;
        settingsTabs.forEach(tab => tab.classList.remove('active'));
        button.classList.add('active');
        settingsPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === target);
        });
    });
});

function applyDarkMode(enabled) {
    document.body.classList.toggle('dark', enabled);
    themeModeText.textContent = enabled ? 'Modo oscuro' : 'Modo claro';
    localStorage.setItem('darkMode', enabled ? 'true' : 'false');
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
        applyDarkMode(darkModeToggle.checked);
    });
    if (localStorage.getItem('darkMode') === 'true') {
        darkModeToggle.checked = true;
        applyDarkMode(true);
    }
}

const modal = document.getElementById('modal');
if (modal) {
    document.getElementById('openModal').onclick = () => { modal.style.display = 'flex'; };
    document.getElementById('closeModal').onclick = () => { modal.style.display = 'none'; };
    document.getElementById('cancelar').onclick = () => { modal.style.display = 'none'; };
}

function generarPDF(tipo) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Ventas', 20, 20);
    doc.setFontSize(12);
    doc.text(`Tipo: ${tipo}`, 20, 30);
    let y = 50;
    doc.text('Productos:', 20, 40);
    dashboardData.topProducts.forEach(v => {
        doc.text(`${v.producto} - Cantidad: ${v.cantidad} - ${formatCurrency(v.total)}`, 20, y); y += 10;
    });
    doc.text(`Ganancias: ${formatCurrency(dashboardData.totalIncome)}`, 20, y + 10);
    doc.save('reporte.pdf');
}

function generarExcel(tipo) {
    const wsData = [["Producto", "Cantidad", "Total"]];
    dashboardData.topProducts.forEach(v => wsData.push([v.producto, v.cantidad, formatCurrency(v.total)]));
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
    XLSX.writeFile(wb, 'reporte.xlsx');
}

const descargarBtn = document.getElementById('descargar');
if (descargarBtn) {
    descargarBtn.onclick = () => {
        const tipo = document.getElementById('tipoReporte').value;
        const formato = document.getElementById('formato').value;
        if (formato === 'pdf') generarPDF(tipo);
        else generarExcel(tipo);
        if (modal) modal.style.display = 'none';
    };
}
