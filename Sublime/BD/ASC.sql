CREATE TRIGGER aumentar_stock_compra
AFTER INSERT ON detalle_compras
FOR EACH ROW
BEGIN
    UPDATE productos
    SET stock = stock + NEW.cantidad
    WHERE id_producto = NEW.id_producto;

    INSERT INTO movimientos_inventario (id_producto, tipo, cantidad, descripcion)
    VALUES (NEW.id_producto, 'entrada', NEW.cantidad, 'Compra a proveedor');
END;