## Demystifying Premature Optimization ##

This repo contains the full code of my blog entry: <todo add link here>

## Install instructions:

1) Run `npm install`. (This is a NodeJS app).
2) Create a file named `.env` in the root folder.
3) Having a instance of PostgreSQL 12+ running.
4) Create an empty database with a `<some_name>` you like.

The `.env` file content:
```c++
# Database settings.
DB_USER="postgres"        # Database login user.
DB_PASS="<some_password>" # Database password.
DB_NAME="<some_name>"     # Database name.
DB_HOST="localhost"       # Database ip.
DB_PORT=5432              # Database port.

# Behavior settings.
TABLE_SIZE=1.5e6    # How many total entries the tables will have.
SAMPLE_SIZE=0.667   # How many % of the entries will NOT be filtered.
ITERATIONS=3        # How many test iterations will be running per service version.
SETUP_DATA=true     # To check if the setup phase needs to be ran. 
#RECREATE_DATA=true # To re-create the data (Will override SETUP_DATA).
#LOG_QUERIES=true   # To print the queries sent to the database (some set-up data queries will be skipped).
```

## Running instructions:

In order to the test to be fair `node <file.js>` must be ran using the flag `--expose-gc`,
so we can use `global.gc()` to do a full garbage collector run before test, so the garbage collector does not run
in the middle of the tests.

There are two 'different' ways of running it:
1) `node --expose-gc index.js`
2) `node --jitless --expose-gc index.js`

The way #2 actually disable the `jit` compiler with the flag `--jitless`. 
Please, be sure to disable `RECREATE_DATA`, if not your test may last a lot of time.

## Notes:

`Environment: SETUP_DATA` --> This controls whether you want the setup phase to run, if this flag is set 
it will first check if the data exists, if not it will re-create the database, otherwise it will run the test
using the pre-existing data.

`Environment: RECREATE_DATA` --> This will override `SETUP_DATA` and will skip the check, having this value as
`RECREATE_DATA=true` will always re-create the data every time you run the tests.

`Environment: SAMPLE_SIZE` --> See `setupDatabase.js` for more implementation details.

## Setup info:
- CPU: I7-9700K
- RAM: 32GB - 3200MHz
- Windows 10 (20H2)
- Node version: v16.5.0
- PostgreSQL: Debian 13.0-1 (Docker)

## Running samples:

`TABLE_SIZE: 1500000 | SAMPLE_SIZE: 0.667 | ITERATIONS: 4`
| service version | run 1  | run 2  | run 3  | run 4  |
|-----------------|--------|--------|--------|--------|
| v1              | 4915ms | 4690ms | 4668ms | 4608ms |
| v2              | 3593ms | 3556ms | 3598ms | 3607ms |
| v3              | 2762ms | 2736ms | 2720ms | 2720ms |
| v4              | 2515ms | 2457ms | 2479ms | 2479ms |
| v4.1            | 1578ms | 1530ms | 1533ms | 1541ms |
| v5              | 1723ms | 1727ms | 1798ms | 1789ms |
| v6              | 1750ms | 1729ms | 1736ms | 1745ms |

For more samples you can go to `/logs/*` and read the `.txt` files.
Also you can ran the test by yourself 😊.

## Author:
#### Enmanuel Reynoso | DarkRoku12 | enmarey2012@hotmail.com