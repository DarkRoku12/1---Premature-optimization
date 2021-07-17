import SQL    from "./postgreSQL.js";
import Tables from "./tables.js";
import Files  from "./sqlfiles.js";

/*
  Enhancements:
  1 - Same as v4.0
  2 - Get rid of .map( { ...p , <concatenation> } ).

  Explanation:
  2 - By ECMA standard that JS need to comply, .map() must return a new array without modifying the old one.
      V8 JIT compiler may not see that the old array won't be used, so instead of not copying the object and just add a 
      property .full_name with the desired string, it's actually creating a new object [copying the previous object properties] + 
      doing the concatenation.

      But it is really interesting that V8 spends more time parsing the computed properties from the PostreSQL driver,
      than computing the data itself. But this are implementation details so YMMV (Your mile may vary).

      So in this enhanced version, we reuse the same object and we do a manual 'copy-elision'.
*/
export default async function people_by_age_v4_1()
{
  // Load people list from database.
  let people = await SQL.exe.any( Files.select_amateur , { table : Tables.v2 });

  // Transform the list.
  for( const p of people )
    p.full_name = `${p.first_name} ${p.last_name}`;

  // Return the data.
  return people;
};