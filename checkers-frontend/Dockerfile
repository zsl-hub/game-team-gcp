FROM node:22 as build-phase

WORKDIR /app

COPY . .

RUN npm ci && npm run build

FROM nginx:1.25.5
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-phase /app/build /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]