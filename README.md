# Folio
## By Andrea McKenzie
### For the NYC Tech Talent Pipeline

### Overview

Folio is a React/Express/PostGresSQL application built to fulfill the requirements for the Stage 2 Assessment for the NYC Tech Talent Pipeline

### Installation instructions

1. Clone this repo
2. Create a PSQL database under 'ttp-fs-stockpicker' with command `createdb ttp-fs-stockpicker`
3. Run all migrations in date order with command `psql -d ttp-fs-stockpicker -a -f db/migrations/<migration file name>.sql`
4. Run `npm install & npm run start` in root
5. Change directories into `client/` with `cd client` and run `npm install && npm run start` 