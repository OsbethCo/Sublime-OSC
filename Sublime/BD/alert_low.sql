CREATE TRIGGER alerta_bajo_stock
AFTER UPDATE ON productos
FOR EACH ROW
WHEN NEW.stock <= NEW.stock_minimo
BEGIN
    INSERT INTO alertas (id_producto, mensaje)
    VALUES (NEW.id_producto, 'Stock bajo');
END;