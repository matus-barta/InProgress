#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

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
