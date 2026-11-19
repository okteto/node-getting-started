FROM node:26.13.1-trixie-slim AS dev

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

FROM node:26.13.1-trixie-slim AS prod

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
CMD ["node", "index.js"]
