FROM node:13-slim AS base
WORKDIR /app
COPY  app.js app.js

#################################

FROM base AS dev

COPY bashrc /root/.bashrc
RUN npm install -g nodemon

#################################

FROM base AS prod

EXPOSE 8080
CMD node app.js
