FROM node:18 AS base
WORKDIR /code
COPY package.json package-lock.json ./
RUN npm install
COPY /packages/frontend/ ./packages/frontend
RUN npm run build --workspace=frontend
COPY /cicd/ ./cicd

FROM nginx:1.17.0-alpine AS nginx 
COPY --from=base /code/packages/frontend/build /usr/share/nginx/html 
COPY --from=base /code/cicd/nginx.conf /etc/nginx/nginx.conf 
COPY --from=base /code/cicd/default.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80 

ENTRYPOINT ["nginx", "-g", "daemon off;"]