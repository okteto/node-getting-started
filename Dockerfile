FROM node:26.13.1-trixie-slim AS dev

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
# The cache mount keeps the npm cache in the Okteto Build Service, which reuses
# it between builds. The tests of the Okteto Manifest use the same cache
RUN --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .

FROM node:26.13.1-trixie-slim AS prod

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
CMD ["node", "index.js"]
