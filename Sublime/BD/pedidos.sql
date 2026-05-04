CREATE TABLE pedidos (
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50),
    total DECIMAL(10,2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);