import SQL    from "./postgreSQL.js";
import Tables from "./tables.js";
import Files  from "./sqlfiles.js";

/*
  Enhancements:
  1 - Now filter & sort operations are done in the database. [with indexes]

  Explanation:
  1 - Same as before, but now the database is more efficient thanks to the index.
    - We should take into account that INSERT/UPDATE/DELETE operations in that table will be a bit slower because the database 
      now will need to update the index as well, so we always need to make indexes that we ACTUALLY/WILL use for sure.
*/
export default async function people_by_age_v4()
{
  // Load people list from database.
  let people = await SQL.exe.any( Files.select_amateur , { table : Tables.v2 });

  // Transform the list.
  people = people.map( p => // Map to full name.
  {
    return {
      ...p ,
      full_name : `${p.first_name} ${p.last_name}`
    };
  });

  // Return the data.
  return people;
};