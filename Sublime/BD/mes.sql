SELECT strftime('%Y-%m', fecha) AS mes, SUM(total) AS total_ventas
FROM ventas
GROUP BY mes;