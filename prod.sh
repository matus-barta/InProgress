#!/bin/bash
FILE=.env
if test -f "$FILE"; then
    echo "$FILE exists."
else 
    echo "$FILE does not exist."
    exit
fi

git pull
nvm use
npm install
npx prisma generate
npm run build
npm run prod
