FROM node:10.13-alpine

ENV NODE_ENV production
ENV MONGO_URL mongodb://mongo:27017

WORKDIR /usr/src/vending

COPY ["package.json","./"]

RUN npm install

COPY . .

EXPOSE 5000

RUN npm run build

CMD [ "node", "dist/index.js" ]