# Development stage
FROM node:lts-buster AS development-stage

MAINTAINER Brandon WELSCH <dev@brandon-welsch.eu>

WORKDIR /usr/src/app

ENV PATH "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:node_modules/.bin"

RUN yarn global add @quasar/cli cordova



# Build stage
FROM node:lts-buster AS build-stage

MAINTAINER Brandon WELSCH <dev@brandon-welsch.eu>

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn global add @quasar/cli cordova

RUN yarn install

COPY . .

RUN yarn run build



# Production stage
FROM nginx:stable-alpine AS production-stage

MAINTAINER Brandon WELSCH <dev@brandon-welsch.eu>

WORKDIR /usr/share/nginx/html

COPY --from=build-stage /usr/src/app/dist/spa ./
COPY --from=build-stage /usr/src/app/prod/nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
