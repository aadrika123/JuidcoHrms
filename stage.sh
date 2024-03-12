#!/bin/sh
SERVER_PORT=7001
DB_PASSWORD="judico@2024"

installModules () {
    echo "Installing frontend node modules ..."
    npm --prefix ./frontend install

    echo "Installing backend node modules ..."
    npm --prefix ./backend install
}

resetDatabases() {
    rm -rf ./backend/prisma/migrations
    cd backend
    echo "creating/updating the env file ..."
    echo "PORT=$SERVER_PORT\nDATABASE_URL=\"postgresql://postgres:$DB_PASSWORD@localhost:5432/hrms?schema=public\"" > .env
    npx prisma migrate dev --name init
    cd ..
}

buildThem(){
    echo "building backend ..."
    npm --prefix ./backend run build

    echo "building frontend ..."
    npm --prefix ./frontend run build
}

startServices(){

    pm2 delete "hrms-back"
    pm2 delete "hrms-front"

    cd ./backend

    pm2 start npm --name "hrms-back" -- start
    cd ../frontend
    pm2 start npm --name "hrms-front" -- start

    cd ..
    pm2 list
}

installModules
resetDatabases
buildThem
startServices


echo "Done!"