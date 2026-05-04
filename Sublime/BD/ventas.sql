CREATE TABLE ventas (
    id_venta INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);