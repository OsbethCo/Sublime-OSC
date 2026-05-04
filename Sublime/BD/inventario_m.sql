CREATE TABLE movimientos_inventario (
    id_movimiento INTEGER PRIMARY KEY AUTOINCREMENT,
    id_producto INTEGER,
    tipo VARCHAR(20), -- entrada / salida
    cantidad INTEGER,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);