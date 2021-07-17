import "./exceptionHandler.js";
import Env       from "./environment.js";
import SQL       from "./postgreSQL.js";
import Benchmark from "./benchmark.js";
import Logger    from "./spinLogger.js";

// Tests //
import setupDatabase from "./setupDatabase.js";
import service_v1    from "./service_v1.js";
import service_v2    from "./service_v2.js";
import service_v3    from "./service_v3.js";
import service_v4    from "./service_v4.js";
import service_v4_1  from "./service_v4.1.js";
import service_v5    from "./service_v5.js";
import service_v6    from "./service_v5.js";

// Execute tests //
( async() =>
{
  /// Debug info ///
  {
    const TS = Env.as.number( "TABLE_SIZE" );
    const SS = Env.as.number( "SAMPLE_SIZE" );
    const IT = Env.as.number( "ITERATIONS" );
    Logger( `TABLE_SIZE: ${TS} | SAMPLE_SIZE: ${SS} | ITERATIONS: ${IT}` , { log : "info" });
  }

  //// Setup database ////
  await setupDatabase();
  Logger( "-------------------------" , { log : "info" });

  //// Do benchmark ////
  const iterations = Env.as.number( "ITERATIONS" );

  for( let i = 0; i < iterations; ++i )
    await Benchmark( service_v1 , "V1" , i+1 );

  Logger( "-------------------------" , { log : "info" });

  for( let i = 0; i < iterations; ++i )
    await Benchmark( service_v2 , "V2" , i+1 );

  Logger( "-------------------------" , { log : "info" });

  for( let i = 0; i < iterations; ++i )
    await Benchmark( service_v3 , "V3" , i+1 );

  Logger( "-------------------------" , { log : "info" });

  for( let i = 0; i < iterations; ++i )
    await Benchmark( service_v4 , "V4" , i+1 );

  Logger( "-------------------------" , { log : "info" });

  for( let i = 0; i < iterations; ++i )
    await Benchmark( service_v4_1 , "V4.1" , i+1 );

  Logger( "-------------------------" , { log : "info" });

  for( let i = 0; i < iterations; ++i )
    await Benchmark( service_v5 , "V5" , i+1 );

  Logger( "-------------------------" , { log : "info" });

  for( let i = 0; i < iterations; ++i )
    await Benchmark( service_v6 , "V6" , i+1 );

  //// Cleanup ////
  Logger( "--- Testing finished ---" , { finish : true });
  SQL.lib.end();
})();
