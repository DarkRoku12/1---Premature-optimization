import SQL    from "./postgreSQL.js";
import Tables from "./tables.js";
import Files  from "./sqlfiles.js";

/*
  Enhancements:
  1 - filter & sort in the database. [no indexes]

  Explanation:
  1 - We got rid of [filter & sort] and we use the database to make those operations instead.
      Database can execute queries request in parallel, unlike NodeJS that will execute those operations synchronously.
      If set the is too big, NodeJS will spend too much time on them and halt other requests, that's not good, NodeJS should
      return a request as fast a possible, if you need a big amount of data processing you better delegate the operation more
      efficient technologies and then bring the result to NodeJS, if you need to execute those operation IN the server/node for 
      whatever reason, NodeJS is not the ideal technology for this. 

      This is proved because despite the database expending more time filtering and sorting because the lack on index, it is still faster
      than plain NodeJS. Remember that NodeJS need to transform the data that comes from the database driver to a format that you can manipulate 
      (i.e: A native JavaScript type).
*/
export default async function people_by_age_v3()
{
  // Load people list from database.
  let people = await SQL.exe.any( Files.select_amateur , { table : Tables.v1 });

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