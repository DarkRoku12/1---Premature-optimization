import SQL    from "./postgreSQL.js";
import Tables from "./tables.js";
import Files  from "./sqlfiles.js";

/*
  Enhancements:
  1 - Same as in v5
  2 - Now we use a STORED GENERATED COLUMN in PostgreSQL.

  Explanation:
  2 - If 'full_name' is a common pattern, could be worth it to spend the extra space and store computation.
*/
export default async function people_by_age_v6()
{
  // Load & return people list from database.
  return await SQL.exe.any( Files.select_master , { table : Tables.v3 });
};