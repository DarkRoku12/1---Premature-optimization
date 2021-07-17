SELECT *,
       ( p.first_name || ' ' || p.last_name ) AS full_name
FROM people_v2 p
WHERE age >= 18
ORDER BY age DESC;