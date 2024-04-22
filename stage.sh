#!/bin/sh
SERVER_PORT=7001
DB_PASSWORD="Secure@2023%3F"
GITHUB_TOKEN="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"

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

resetDatabases() {
    rm -rf ./backend/prisma/migrations
    cd backend
    echo "creating/updating the env file ..."
    echo "PORT=$SERVER_PORT\nDATABASE_URL=\"postgresql://postgres:$DB_PASSWORD@localhost:5432/hrms?schema=public\"" > .env
    echo "TWILIO_ACCNT_SID=\"AC9568828d649d47f5865843700bbf0a8c\"" > .env
    echo "TWILIO_AUTH_TOKEN=\"c42b48d58fdfa250a2ad74aa8c3c2bbb\"" > .env
    echo "TWILIO_PHONE=\"+16562269475\""> .env
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

# git clone -b krish_dev https://Kkrish7654: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@github.com/aadrika123/JuidcoHrms.git

# git clone -b krish_dev https://Kkrish7654:$GITHUB_TOKEN@github.com/aadrika123/JuidcoHrms.git

installModules
configure
resetDatabases
buildThem
startServices


echo "Done!"
