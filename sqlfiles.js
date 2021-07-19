import SQL from "./postgreSQL.js";

export default
{
  create_tables  : new SQL.lib.QueryFile( "./sql/create_tables.pgsql" ) ,
  copy_tables    : new SQL.lib.QueryFile( "./sql/copy_table.pgsql" ) ,
  select_noob    : new SQL.lib.QueryFile( "./sql/select_people_noob.pgsql" ) ,
  select_amateur : new SQL.lib.QueryFile( "./sql/select_people_amateur.pgsql" ) ,
  select_pro     : new SQL.lib.QueryFile( "./sql/select_people_pro.pgsql" ) ,
  select_master  : new SQL.lib.QueryFile( "./sql/select_people_master.pgsql" ) ,
};
