# BETTER CLIMBING

## What in the name of Jesus is this?

This is the code base for the API of Better Climbing.

## Project Setup

Setup this project by running npm install to add all dependencies
You will also need docker to be installed


## Platform Specific info

This codebase is currently being developed and tested on Ubuntu, additional scripts or tooling may be needed to run it on Mac or Windows. 


## Database

The database stores all the information about coaches, classes, bookings etc.

It is a PostgresSQL database and its schema are currently subject to change.
In order to facilitate this, I have created a script that creates a docker container using the postgres docker image and generates tables.

For the purposes of testing, you can modify the schema for the tables that are created and the records that are added in `scripts/generate-tables.sql`. 

### Starting the database 
Build the docker image, start the container and initialise the db by running:

`npm run init-db`

All files for this setup are contained in the `/scripts` folder

## Running the API

Once you have setup project dependencies and have the docker db instance running, run the API using:

`npm start`

### Getting information

The API runs on port 8000, as such the API data can be reached here, for example:

The coach with ID `2` can be acquired by:

via a GET request to `http://localhost:8000/coach/get?id=2` on software like postman

OR

using CURL `curl --location --request GET 'http://localhost:8000/coach/get?id=2'`
