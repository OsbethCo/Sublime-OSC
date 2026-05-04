CREATE TABLE detalle_pedidos (
    id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER,
    id_producto INTEGER,
    cantidad INTEGER,
    precio_unitario DECIMAL(10,2),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);