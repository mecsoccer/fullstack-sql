SELECT
    u.name,
    u.email,
    SUM(o.quantity * p.price) AS total_spent
FROM
    users u
JOIN
    orders o ON u.id = o.user_id
JOIN
    products p ON o.product_id = p.id
WHERE
    p.category = 'Electronics'
GROUP BY
    u.id
HAVING
    COUNT(DISTINCT o.id) >= 3
    AND SUM(o.quantity * p.price) > 1000
ORDER BY
    total_spent DESC;
