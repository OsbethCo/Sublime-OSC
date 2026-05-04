CREATE TABLE productos (
    id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_venta DECIMAL(10,2) NOT NULL,
    costo DECIMAL(10,2),
    stock INTEGER DEFAULT 0,
    id_categoria INTEGER,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);