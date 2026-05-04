CREATE TRIGGER disminuir_stock_venta
AFTER INSERT ON detalle_ventas
FOR EACH ROW
BEGIN
    UPDATE productos
    SET stock = stock - NEW.cantidad
    WHERE id_producto = NEW.id_producto;

    INSERT INTO movimientos_inventario (id_producto, tipo, cantidad, descripcion)
    VALUES (NEW.id_producto, 'salida', NEW.cantidad, 'Venta realizada');
END;