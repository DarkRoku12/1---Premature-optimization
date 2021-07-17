import Env from "./environment.js";
import Ora from "ora";

let spinner = null;

const DefaultLogger = ( text , ...args ) => console.log( text );

const LoggerWithSpinner = function( text , options = {})
{
  if( !spinner )
  {
    spinner = Ora( text ).start();
    return;
  }

  if( spinner.isSpinning )
    spinner.succeed();

  spinner.start( text );

  if( options.log == "info" )
    spinner.info();
  else if( options.log == "error" )
    spinner.error();

  if( options.finish == true )
  {
    spinner.succeed();
    spinner = null;
  }
};

const Logger = Env.as.boolean( "LOG_QUERIES" ) ? DefaultLogger : LoggerWithSpinner;

export default Logger;
