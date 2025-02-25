# Installation

Run these commands to install the database in a
PostgresSQL server locally.

```bash
# Create database
psql -U postgres -f .\db\database.sql

# Create tables
psql -U postgres -d wyhn -f .\db\tables.sql
```

