import SQL    from "./postgreSQL.js";
import Tables from "./tables.js";
import Files  from "./sqlfiles.js";

/*
  Naive implementation.
*/
export default async function people_by_age_v1()
{
  // Load people list from database.
  let people = await SQL.exe.any( Files.select_noob , { table : Tables.v1 });

  // Transform the list.
  people = people
    .sort( ( a , b ) => b.age - a.age ) // Sort by age.
    .map( p => // Map to full name.
    {
      return {
        ...p ,
        full_name : `${p.first_name} ${p.last_name}`
      };
    })
    .filter( p => p.age >= 18 ); // Filter by age.

  // Return the data.
  return people;
};