# Plan B Network

This is the repository for the PlanB Network website. The goal of this project is to create a free, open-source, and community-driven platform to learn about Bitcoin.

The repository holding the data for this project is [here](https://github.com/DecouvreBitcoin/sovereign-university-data).

We are looking for contributors! If you want to help or learn more about the project, please reach out to us on [Twitter](https://twitter.com/planb_network) or [Discord](https://discord.com/invite/CHvZAhJCBh).

## Development - Run the project locally

We use [Turbo](https://turbo.build/) to manage the monorepo and Docker to run the development environment.

Follow the next steps to run the project locally, on a linux machine.

### Clone the repo

Do it.

### Setup your environment variables

Duplicate the [.env.example](.env.example) file and rename the duplicate `.env`.

### Run the containers

To start the development environment, run :

1. `pnpm install`
2. `docker compose up --build -V`

This will start all the necessary containers.

### Set up your database schema

On the first run, you will need to run the DB migrations.

To do so, run go to the database folder with then run the migration script :

1. `cd packages/database`
2. `pnpm run db:migrate`

Once the containers are up and running, you can access the front at `http://localhost:8181`. The app will automatically reload if you change any of the source files.

### Import data from the data repository

In order to sync the database with the data from the data repository, you can make a request to the API with `curl -X POST http://localhost:3000/api/github/sync`. This will import all the data from the data repository into the database.

### Sync issue

When running the sync locally, there is currently and access right issue with the cdn volume. To fix it, find where the volume named sovereign-university_cdn is located (using `docker volume inspect sovereign-university_cdn`).

Then update the access rights on this folder :
`sudo chmod 777 /var/lib/docker/volumes/sovereign-university_cdn/_data`

## Development - Manage the database

### Update the schema

The central point for the database schema is this file : [Schema](/packages/database/drizzle/schema.ts).

For any update to it, you first have to update the schema.ts file.

Once updated, to reflect it in your database, run the following commands :

1. `cd packages/database`
2. `pnpm run drizzle:generate`

This will add a new migration script, then you hav to run it :

`pnpm run db:migrate`

Once the database is updated, update or create the associated types running :

1. `cd packages/types`
2. `pnpm run types:generate`

### Run SQL queries

To open psql, run `docker exec -it sovereign-university-postgres-1 psql -U postgres -d postgres`
