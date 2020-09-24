FROM node:13-slim AS base

WORKDIR /app

ADD package.json .
RUN npm install

COPY index.js .

EXPOSE 3000

CMD npm start
