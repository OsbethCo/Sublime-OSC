CREATE TABLE personalizaciones (
    id_personalizacion INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER,
    descripcion TEXT,
    ruta_imagen TEXT,
    estado_produccion VARCHAR(50),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
);