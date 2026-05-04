SELECT strftime('%Y', fecha) AS año, SUM(total) AS total_ventas
FROM ventas
GROUP BY año;