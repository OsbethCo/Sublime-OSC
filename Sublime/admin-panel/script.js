// =====================
// ANIMACION BARRAS
// =====================
window.onload = () => {
    document.querySelectorAll(".progress div").forEach(bar => {
        let width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
};

// =====================
// DONUT CHART (INVENTARIO)
// =====================
const donut = document.getElementById("donutChart");

new Chart(donut, {
    type: "doughnut",
    data: {
        labels: ["Franelas", "Gorras", "Tazas"],
        datasets: [{
            data: [40, 25, 35],
            backgroundColor: [
                "#3b82f6",
                "#8b5cf6",
                "#f59e0b"
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        cutout: "70%", // 🔥 aro fino como en tu imagen

        plugins: {
            legend: {
                display: false // 🔥 no hay leyenda en tu diseño
            }
        },

        animation: {
            animateRotate: true,
            duration: 2000
        }
    }
});

// =====================
// LINE CHART (GASTOS VS GANANCIAS)
// =====================
const line = document.getElementById("lineChart");

new Chart(line, {
    type: "line",
    data: {
        labels: ["Dic","Ene","Feb","Mar","Abr","May","Jun"],
        datasets: [
            {
                label: "Ganancias",
                data: [900,1100,1000,1300,1200,1500,1700],
                borderColor: "#22c55e",
                backgroundColor: "rgba(34,197,94,0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 0
            },
            {
                label: "Gastos",
                data: [800,950,900,1100,1000,1200,1400],
                borderColor: "#ef4444",
                backgroundColor: "rgba(239,68,68,0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
            mode: "index",
            intersect: false
        },

        plugins: {
            legend: {
                position: "bottom"
            }
        },

        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    color: "#eee"
                }
            }
        },

        animations: {
            tension: {
                duration: 2000,
                easing: "easeInOutQuart",
                from: 1,
                to: 0.4
            }
        }
    }
});
// =====================
// MODAL CONTROL
// =====================
const modal = document.getElementById("modal");

document.getElementById("openModal").onclick = () => {
    modal.style.display = "flex";
};

document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
};

document.getElementById("cancelar").onclick = () => {
    modal.style.display = "none";
};

// =====================
// DATOS SIMULADOS
// =====================
const datos = {
    ventas: [
        { producto: "Franela Blanca", cantidad: 10, total: 78 },
        { producto: "Franela Negra", cantidad: 8, total: 52 },
        { producto: "Gorra", cantidad: 5, total: 20 }
    ],
    ganancias: 199,
    gastos: 120
};

// =====================
// GENERAR PDF
// =====================
function generarPDF(tipo) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reporte de Ventas", 20, 20);

    doc.setFontSize(12);
    doc.text(`Tipo: ${tipo}`, 20, 30);

    let y = 50;

    doc.text("Productos:", 20, 40);

    datos.ventas.forEach(v => {
        doc.text(
            `${v.producto} - Cantidad: ${v.cantidad} - $${v.total}`,
            20,
            y
        );
        y += 10;
    });

    doc.text(`Ganancias: $${datos.ganancias}`, 20, y + 10);
    doc.text(`Gastos: $${datos.gastos}`, 20, y + 20);

    doc.save("reporte.pdf");
}

// =====================
// GENERAR EXCEL
// =====================
function generarExcel(tipo) {

    const wsData = [
        ["Producto", "Cantidad", "Total"]
    ];

    datos.ventas.forEach(v => {
        wsData.push([v.producto, v.cantidad, v.total]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Reporte");

    XLSX.writeFile(wb, "reporte.xlsx");
}

// =====================
// BOTON DESCARGAR
// =====================
document.getElementById("descargar").onclick = () => {

    const tipo = document.getElementById("tipoReporte").value;
    const formato = document.getElementById("formato").value;

    if (formato === "pdf") {
        generarPDF(tipo);
    } else {
        generarExcel(tipo);
    }

    modal.style.display = "none";
};
