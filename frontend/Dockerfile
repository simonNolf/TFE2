# Dockerfile pour le frontend

FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY data.csv /usr/share/nginx/html/
COPY ../nginx.conf /etc/nginx/conf.d/nginx.conf
COPY dist/ /usr/share/nginx/html/

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]