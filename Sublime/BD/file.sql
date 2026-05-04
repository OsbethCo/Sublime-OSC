SELECT p.nombre, SUM(dv.cantidad) AS total_vendido
FROM detalle_ventas dv
JOIN productos p ON dv.id_producto = p.id_producto
GROUP BY p.nombre
ORDER BY total_vendido DESC;