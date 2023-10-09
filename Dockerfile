FROM node:12.6.0 AS build-stage

ARG APP_ENV=build
ARG FRONT_HTTP_API

RUN mkdir /app
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install

COPY . .
RUN VUE_APP_BASE_API=$FRONT_HTTP_API yarn $APP_ENV

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
