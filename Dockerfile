FROM node:14
WORKDIR /usr/src/vending

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD [ "node", "dist/index.js" ]