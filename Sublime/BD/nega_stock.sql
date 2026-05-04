CREATE TRIGGER evitar_stock_negativo_venta
BEFORE INSERT ON detalle_ventas
FOR EACH ROW
BEGIN
    SELECT CASE
        WHEN (SELECT stock FROM productos WHERE id_producto = NEW.id_producto) < NEW.cantidad
        THEN RAISE(ABORT, 'Error: Stock insuficiente')
    END;
END;