import Env      from "./environment.js";
import SQL      from "./postgreSQL.js";
import Logger   from "./spinLogger.js";
import Tables   from "./tables.js";
import Files    from "./sqlfiles.js";
import Faker    from "faker";
import sqlfiles from "./sqlfiles.js";

// Generate a batch of sample data.
const generateDataBatch = function( batchSize )
{
  const dataset = [];

  for( let j = 0; j < batchSize; ++j )
  {
    // Approximately ( if [SAMPLE_SIZE] = 0.667 ~ 2/3 ) of the people will have 18 years or more.
    const ratio    = Env.as.number( "SAMPLE_SIZE" ) || 0.667;
    const underage = Math.floor( Math.abs( 1 / ( 1 * ratio - 1 ) ) );
    const age      = j % underage == 0 ?
      Faker.datatype.number({ min : 1 , max : 17 }) :
      Faker.datatype.number({ min : 18 , max : 99 });

    dataset.push({
      first_name : Faker.name.firstName() ,
      last_name  : Faker.name.lastName() ,
      age        : age ,
    });
  }

  return dataset;
};

// Execute the database setup.
export default async function setupDatabase()
{
  try
  {
    let needSetup = Env.as.boolean( "RECREATE_DATA" );

    if( !needSetup ) // Re-create the data is not set.
    {
      if( Env.as.boolean( "SETUP_DATA" ) ) // Check if the setup phase needs to be ran.
      {
        try
        {
          needSetup = !( await SQL.exe.one( "SELECT COUNT(id) AS count FROM $1:alias" , Tables.v3 , n => n.count ) );
        }
        catch
        {
          needSetup = true;
        }
      }
    }

    if( !needSetup ) return;

    //// Create table & indexes ////
    Logger( "---> Create tables <---" );

    await SQL.exe.none( Files.create_tables , {
      table1 : Tables.v1 ,
      table2 : Tables.v2 ,
      table3 : Tables.v3 ,
    });

    SQL.monitor.detach();

    //// Insert main data ////
    Logger( "** Inserting main data" );
    const insertPromises = [];
    const columns        = [ "first_name" , "last_name" , "age" ];
    const tableSize      = Env.as.number( "TABLE_SIZE" );
    const batchSize      = 100;

    for( let i = 0; i < tableSize; i+=batchSize )
    {
      const dataset       = generateDataBatch( batchSize );
      const insertQuery   = SQL.lib.helpers.insert( dataset , columns , Tables.v1 );
      const insertPromise = SQL.exe.none( insertQuery );
      insertPromises.push( insertPromise );
    }

    Logger( "** Waiting for inserts to finish" );

    for( const promise of insertPromises )
      await promise;

    SQL.monitor.reattach();

    //// Copy data among tables ////
    Logger( "** Copying data" );

    // Copy from v1 to v2.
    await SQL.exe.none( Files.copy_tables , {
      from : Tables.v1 ,
      to   : Tables.v2 ,
    });

    // Copy from v1 to v3.
    await SQL.exe.none( Files.copy_tables , {
      from : Tables.v1 ,
      to   : Tables.v3 ,
    });

    Logger( "** Database setup completed!" , { finish : true });
  }
  catch( error )
  {
    console.log( error );
  }
};
