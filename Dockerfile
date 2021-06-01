FROM node:12.16-alpine as build
RUN npm i npm@latest -g
WORKDIR /app

COPY .npmrc .
COPY package*.json ./
RUN ls -la && npm install --no-optional && npm cache clean --force

COPY . .

RUN npm run build

FROM caddy:2.0.0-alpine

COPY .production/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/build /var/www
