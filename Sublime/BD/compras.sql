CREATE TABLE compras (
    id_compra INTEGER PRIMARY KEY AUTOINCREMENT,
    id_proveedor INTEGER,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor)
);