PRAGMA foreign_keys = ON;


-- ROLES


CREATE TABLE roles (
    id_rol INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE
);


-- USUARIOS


CREATE TABLE usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    id_rol INTEGER NOT NULL,

    FOREIGN KEY (id_rol)
    REFERENCES roles(id_rol)
);


-- CLIENTES


CREATE TABLE clientes (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(100),
    direccion TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- PROVEEDORES


CREATE TABLE proveedores (
    id_proveedor INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(100),
    direccion TEXT
);


-- CATEGORÍAS


CREATE TABLE categorias (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE
);


-- PRODUCTOS


CREATE TABLE productos (
    id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    costo DECIMAL(10,2) NOT NULL,
    precio_venta DECIMAL(10,2) NOT NULL,
    id_categoria INTEGER NOT NULL,
    activo INTEGER DEFAULT 1,

    FOREIGN KEY (id_categoria)
    REFERENCES categorias(id_categoria)
);


-- IMÁGENES DE PRODUCTOS


CREATE TABLE imagenes_productos (
    id_imagen INTEGER PRIMARY KEY AUTOINCREMENT,
    id_producto INTEGER NOT NULL,
    ruta_imagen TEXT NOT NULL,

    FOREIGN KEY (id_producto)
    REFERENCES productos(id_producto)
);


-- INVENTARIO


CREATE TABLE inventario (
    id_inventario INTEGER PRIMARY KEY AUTOINCREMENT,
    id_producto INTEGER NOT NULL UNIQUE,
    stock_actual INTEGER DEFAULT 0,
    stock_minimo INTEGER DEFAULT 5,

    FOREIGN KEY (id_producto)
    REFERENCES productos(id_producto)
);


-- MOVIMIENTOS DE INVENTARIO


CREATE TABLE movimientos_inventario (
    id_movimiento INTEGER PRIMARY KEY AUTOINCREMENT,
    id_producto INTEGER NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    cantidad INTEGER NOT NULL,
    descripcion TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_producto)
    REFERENCES productos(id_producto)
);


-- ALERTAS


CREATE TABLE alertas (
    id_alerta INTEGER PRIMARY KEY AUTOINCREMENT,
    id_producto INTEGER NOT NULL,
    mensaje TEXT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_producto)
    REFERENCES productos(id_producto)
);


-- ESTADOS DE PEDIDOS


CREATE TABLE estados_pedido (
    id_estado INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE
);


-- PEDIDOS


CREATE TABLE pedidos (
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER NOT NULL,
    id_estado INTEGER NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) DEFAULT 0,

    FOREIGN KEY (id_cliente)
    REFERENCES clientes(id_cliente),

    FOREIGN KEY (id_estado)
    REFERENCES estados_pedido(id_estado)
);


-- DETALLE DE PEDIDOS


CREATE TABLE detalle_pedidos (
    id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (id_pedido)
    REFERENCES pedidos(id_pedido),

    FOREIGN KEY (id_producto)
    REFERENCES productos(id_producto)
);


-- PERSONALIZACIONES


CREATE TABLE personalizaciones (
    id_personalizacion INTEGER PRIMARY KEY AUTOINCREMENT,
    id_detalle_pedido INTEGER NOT NULL,
    descripcion TEXT,

    FOREIGN KEY (id_detalle_pedido)
    REFERENCES detalle_pedidos(id_detalle)
);

-- IMÁGENES PERSONALIZADAS


CREATE TABLE imagenes_personalizacion (
    id_imagen INTEGER PRIMARY KEY AUTOINCREMENT,
    id_personalizacion INTEGER NOT NULL,
    ruta_imagen TEXT NOT NULL,

    FOREIGN KEY (id_personalizacion)
    REFERENCES personalizaciones(id_personalizacion)
);


-- TEXTOS PERSONALIZADOS


CREATE TABLE textos_personalizacion (
    id_texto INTEGER PRIMARY KEY AUTOINCREMENT,
    id_personalizacion INTEGER NOT NULL,
    texto TEXT NOT NULL,

    FOREIGN KEY (id_personalizacion)
    REFERENCES personalizaciones(id_personalizacion)
);


-- VENTAS


CREATE TABLE ventas (
    id_venta INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (id_cliente)
    REFERENCES clientes(id_cliente)
);


-- DETALLE DE VENTAS


CREATE TABLE detalle_ventas (
    id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
    id_venta INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (id_venta)
    REFERENCES ventas(id_venta),

    FOREIGN KEY (id_producto)
    REFERENCES productos(id_producto)
);


-- MÉTODOS DE PAGO


CREATE TABLE metodos_pago (
    id_metodo_pago INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE
);


-- PAGOS DE VENTAS


CREATE TABLE pagos_venta (
    id_pago INTEGER PRIMARY KEY AUTOINCREMENT,
    id_venta INTEGER NOT NULL,
    id_metodo_pago INTEGER NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    referencia TEXT,

    FOREIGN KEY (id_venta)
    REFERENCES ventas(id_venta),

    FOREIGN KEY (id_metodo_pago)
    REFERENCES metodos_pago(id_metodo_pago)
);


-- FACTURAS


CREATE TABLE facturas (
    id_factura INTEGER PRIMARY KEY AUTOINCREMENT,
    id_venta INTEGER NOT NULL,
    numero_factura VARCHAR(50) UNIQUE,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2),
    impuesto DECIMAL(10,2),
    total DECIMAL(10,2),

    FOREIGN KEY (id_venta)
    REFERENCES ventas(id_venta)
);


-- COMPRAS


CREATE TABLE compras (
    id_compra INTEGER PRIMARY KEY AUTOINCREMENT,
    id_proveedor INTEGER NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),

    FOREIGN KEY (id_proveedor)
    REFERENCES proveedores(id_proveedor)
);


-- DETALLE DE COMPRAS


CREATE TABLE detalle_compras (
    id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
    id_compra INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    costo_unitario DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (id_compra)
    REFERENCES compras(id_compra),

    FOREIGN KEY (id_producto)
    REFERENCES productos(id_producto)
);

-- =========================================
-- CAJA
-- =========================================

CREATE TABLE caja (
    id_movimiento INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo VARCHAR(20) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    descripcion TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- TRIGGERS



-- EVITAR STOCK NEGATIVO


CREATE TRIGGER evitar_stock_negativo
BEFORE INSERT ON detalle_ventas
FOR EACH ROW
BEGIN
    SELECT CASE
        WHEN (
            SELECT stock_actual
            FROM inventario
            WHERE id_producto = NEW.id_producto
        ) < NEW.cantidad

        THEN RAISE(ABORT, 'Stock insuficiente')
    END;
END;

-- =========================================
-- DESCONTAR STOCK EN VENTAS
-- =========================================

CREATE TRIGGER disminuir_stock_venta
AFTER INSERT ON detalle_ventas
FOR EACH ROW
BEGIN

    UPDATE inventario
    SET stock_actual = stock_actual - NEW.cantidad
    WHERE id_producto = NEW.id_producto;

    INSERT INTO movimientos_inventario (
        id_producto,
        tipo,
        cantidad,
        descripcion
    )
    VALUES (
        NEW.id_producto,
        'salida',
        NEW.cantidad,
        'Venta realizada'
    );

END;

-- =========================================
-- AUMENTAR STOCK EN COMPRAS
-- =========================================

CREATE TRIGGER aumentar_stock_compra
AFTER INSERT ON detalle_compras
FOR EACH ROW
BEGIN

    UPDATE inventario
    SET stock_actual = stock_actual + NEW.cantidad
    WHERE id_producto = NEW.id_producto;

    INSERT INTO movimientos_inventario (
        id_producto,
        tipo,
        cantidad,
        descripcion
    )
    VALUES (
        NEW.id_producto,
        'entrada',
        NEW.cantidad,
        'Compra realizada'
    );

END;


-- ALERTA DE BAJO STOCK


CREATE TRIGGER alerta_stock_bajo
AFTER UPDATE ON inventario
FOR EACH ROW
WHEN NEW.stock_actual <= NEW.stock_minimo
BEGIN

    INSERT INTO alertas (
        id_producto,
        mensaje
    )
    VALUES (
        NEW.id_producto,
        'Stock bajo del mínimo permitido'
    );

END;