import Path from "path";

const ProcessStack = function( stack )
{
  const pathMatch = [ ...stack.matchAll( /file:[\/]{3}(.*):(\d+):(\d+)/gi ) ];
  const firstFile = pathMatch[0];

  if( firstFile )
  {
    const filePath = firstFile[1].replaceAll( "%20" , " " );
    const line     = firstFile[2];
    const column   = firstFile[3];
    const baseFile = Path.relative( process.cwd() , filePath );
    console.log( `File: ./${baseFile}:${line}:${column}` );
  }
};

// Attach default exception handlers to the Node process.
process.on( "unhandledRejection" , function( reason , promise )
{
  console.error( `Unhandled Promise Rejection: ${reason}` , reason.stack );
  process.exit( 1 );
}).on( "uncaughtException" , function( err )
{
  console.error( `Uncaught Exception: ${err}` , err.stack );
  ProcessStack( err.stack );
  process.exit( 1 );
});
