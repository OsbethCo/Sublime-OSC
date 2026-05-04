SELECT DATE(fecha) AS dia, SUM(total) AS total_ventas
FROM ventas
GROUP BY DATE(fecha);