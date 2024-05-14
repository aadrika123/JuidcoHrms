#!/bin/sh
SERVER_PORT=7001
DB_PASSWORD="Perfect@#@##)@%3F"

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

migrate() {
    cd backend
    echo "creating/updating the env file ..."
    echo "PORT=$SERVER_PORT\nDATABASE_URL=\"postgresql://postgres:$DB_PASSWORD@localhost:5433/hrms?schema=public\"" > .env
    echo "TWILIO_ACCNT_SID=\"AC9568828d649d47f5865843700bbf0a8c\"" >> .env
    echo "TWILIO_AUTH_TOKEN=\"8c288639cacd7f5162fc7c99a7ad2a74\"" >> .env
    echo "TWILIO_PHONE=\"+16562269475\"">> .env
    npx prisma run migrate
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

git pull
installModules
configure
migrate
buildThem
startServices


echo "Done!"
