import dotenv from "dotenv";

// Apply the .env file.
const dotConfig = dotenv.config();

// Add further parsing to support in-line comments.
for( const key in dotConfig.parsed )
{
  const value = dotConfig.parsed[key]
    .replace( /#.*$/g , "" )
    .trim()
    .replace( /^["']/g , "" )
    .replace( /["']$/g , ""  );

  process.env[ key ] = value;
}

// Utility table.
const environment = { as : {} };

// Returns the environment variable as a Number.
environment.as.number = function( key )
{
  return Number( process.env[ key ] ) || NaN;
};

// Returns the environment variable as a Boolean.
environment.as.boolean = function( key )
{
  const value = process.env[ key ];
  return !!( value && String( value ).toLowerCase() === "true" );
};

// Returns the environment variable as a String.
environment.as.string = function( key )
{
  return String( process.env[ key ] || "" );
};

const proxyHandler =
{
  get : function( target , key )
  {
    if( key in target ) return target[ key ];
    if( key in process.env ) return process.env[ key ];
    throw `Key: ${key} not found in process.env`;
  } ,

  set : function( target , key , value )
  {
    process.env[ key ] = value;
  }
};

export default new Proxy( environment , proxyHandler );