CREATE TABLE usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    id_rol INTEGER,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);