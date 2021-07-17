import SQL    from "./postgreSQL.js";
import Tables from "./tables.js";
import Files  from "./sqlfiles.js";

/*
  Enhancements:
  1 - Same as in v4.0
  2 - Transform 'full_name' in the database.

  Explanation:
  2 - Obviously, the database will expend more time to bring the data if it needs to do the concatenation, 
  but actually PostgreSQL was programed in C, and in C there are no built-in garbage collectors, 
  and naturally object-copying is more expensive in Javascript.
  Even if V8 can do some "copy elision" (https://en.wikipedia.org/wiki/Copy_elision), 
  there are more things around the whole Javascript implementation that the V8 engine needs to take care of than PostgreSQL.
  -> An exception is present on the version v4.1, see service_v4.js for further information.
*/
export default async function people_by_age_v5()
{
  // Load & return people list from database.
  return await SQL.exe.any( Files.select_pro , { table : Tables.v2 });
};