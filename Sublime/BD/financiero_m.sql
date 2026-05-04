CREATE TABLE movimientos_financieros (
    id_movimiento INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo VARCHAR(20), -- ingreso / egreso
    monto DECIMAL(10,2),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT
);