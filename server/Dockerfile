FROM node:16.14.0-alpine3.14

WORKDIR /usr/src/

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "app.js" ]