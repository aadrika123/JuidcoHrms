#!/bin/sh
SERVER_PORT=7001
DB_PASSWORD="Secure@2023%3F"

installModules () {
    echo "Installing frontend node modules ..."
    npm --prefix ./frontend install

    echo "Installing backend node modules ..."
    npm --prefix ./backend install
}


configure(){
    rm  ./backend/prisma/seeder/foreignWrapper.seed.ts
    cp ./staging/foreignWrapper.seed.ts ./backend/prisma/seeder/

    rm ./frontend/next.config.js
    cp ./staging/next.config.js ./frontend
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

git pull
installModules
configure
buildThem
startServices


echo "Done!"