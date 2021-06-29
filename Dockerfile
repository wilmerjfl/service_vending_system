FROM node:14
WORKDIR /usr/src/vending

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

RUN npm run build

CMD [ "node", "dist/index.js" ]