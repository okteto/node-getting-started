FROM node:13-slim AS base

WORKDIR /app
COPY  app.js app.js

EXPOSE 8080

CMD node app.js
