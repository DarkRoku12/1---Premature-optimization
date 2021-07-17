SELECT p.id,
       p.first_name,
       p.last_name,
       p.age,
       p.full_name
FROM people_v3 p
WHERE age >= 18
ORDER BY age DESC;