SELECT 
    SUM((dv.precio_unitario - p.costo) * dv.cantidad) AS ganancia_total
FROM detalle_ventas dv
JOIN productos p ON dv.id_producto = p.id_producto;