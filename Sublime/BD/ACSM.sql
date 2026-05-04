CREATE TRIGGER actualizar_stock_movimiento
AFTER INSERT ON movimientos_inventario
FOR EACH ROW
WHEN NEW.descripcion = 'AJUSTE MANUAL'
BEGIN
    UPDATE productos
    SET stock = 
        CASE 
            WHEN NEW.tipo = 'entrada' THEN stock + NEW.cantidad
            WHEN NEW.tipo = 'salida' THEN stock - NEW.cantidad
        END
    WHERE id_producto = NEW.id_producto;
END;