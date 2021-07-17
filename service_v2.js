import SQL    from "./postgreSQL.js";
import Tables from "./tables.js";
import Files  from "./sqlfiles.js";

/*
  Enhancements:
  1 - Do the filter operation before [sort & map].

  Explanation:
  1 - If the set is smaller, transform operations [sort & map] will take less time.
*/
export default async function people_by_age_v2()
{
  // Load people list from database.
  let people = await SQL.exe.any( Files.select_noob , { table : Tables.v1 });

  // Transform the list.
  people = people
    .filter( p => p.age >= 18 ) // Filter by age.
    .sort( ( a , b ) => b.age - a.age ) // Sort by age.
    .map( p => // Map to full name.
    {
      return {
        ...p ,
        full_name : `${p.first_name} ${p.last_name}`
      };
    });

  // Return the data.
  return people;
};