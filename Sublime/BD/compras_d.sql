CREATE TABLE detalle_compras (
    id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
    id_compra INTEGER,
    id_producto INTEGER,
    cantidad INTEGER,
    costo_unitario DECIMAL(10,2),
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);