SELECT strftime('%Y-%W', fecha) AS semana, SUM(total) AS total
FROM ventas
GROUP BY semana;