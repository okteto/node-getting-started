FROM node:10-alpine
WORKDIR /app
COPY  app.js app.js
CMD node app.js
