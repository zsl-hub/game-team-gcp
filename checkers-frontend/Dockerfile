FROM node:22 as build-phase

WORKDIR /app

COPY . .

RUN npm ci 

FROM nginx:stable-alpine
COPY --from=build-phase /app/build /bin/www
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]