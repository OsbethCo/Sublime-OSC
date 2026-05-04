CREATE TABLE facturas (
    id_factura INTEGER PRIMARY KEY AUTOINCREMENT,
    id_venta INTEGER,
    id_metodo_pago INTEGER,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_metodo_pago) REFERENCES metodos_pago(id_metodo_pago)
);