import Env       from "./environment.js";
import PgPromise from "pg-promise";
import PgMonitor from "pg-monitor";

const options =
{
  capSQL : true ,

  /* 
    PgPromise will create a pool of connection, when a new connection is created
    useCount = 0, we want set the default database search_path and any other session-side settings.
  */
  connect( client , context , useCount )
  {
    if( useCount > 0 ) return;
    client.query( "SET search_path = 'public'" );
  } ,

  error( err , context )
  {
    // console.error( "[PG ERROR]:" , err ) ;
  } ,
};

PgMonitor.reattach = function( params )
{
  if( Env.as.boolean( "LOG_QUERIES" ) ) // Log queries & errors.
    PgMonitor.attach( options , [ "query" , "error" ] );
  else // Don't log queries.
    PgMonitor.attach( options , [] );
};

PgMonitor.reattach();

// Loading and initializing the library:
const pgp = PgPromise( options );

// Set-up database credentials.
const credentials =
{
  host     : Env.DB_HOST ,
  port     : Env.DB_PORT ,
  database : Env.DB_NAME ,
  user     : Env.DB_USER ,
  password : Env.DB_PASS ,
};

// Create a new database instance from the connection details:
const db = pgp( credentials );

export default { lib : pgp , exe : db , monitor : PgMonitor };