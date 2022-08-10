#!/bin/bash
env PGUSER=postgres PGHOST=betterclimbingdb.c7vcdoa3jr7x.eu-west-1.rds.amazonaws.com PGPASSWORD=Cl1mbingbetter PGDATABASE=betterclimbing PGPORT=5432 pm2 start src/app.js --name API

