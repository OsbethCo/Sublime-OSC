CREATE TABLE detalle_ventas (
    id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
    id_venta INTEGER,
    id_producto INTEGER,
    cantidad INTEGER,
    precio_unitario DECIMAL(10,2),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);