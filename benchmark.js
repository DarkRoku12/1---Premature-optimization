import Logger from "./spinLogger.js";

const getTime = () => ( new Date ).getTime();

const CollectGarbage = function()
{
  if( global.gc )
    global.gc();
  else
    console.warn( "No GC hook: please, start the program as: node --expose-gc index.js" );
};

export default async function Benchmark( callback , name , iteration )
{
  CollectGarbage();
  Logger( `Benchmarking: ${name} | iteration: ${iteration}` );
  const start = getTime();
  await callback();
  const end = getTime();
  Logger( `** Took: ${end - start}ms` );
};