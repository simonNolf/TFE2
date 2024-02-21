# Utilisez l'image officielle Nginx pour déployer votre application frontend
FROM nginx:latest

# Supprimez la configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiez les fichiers construits de votre projet frontend dans le répertoire par défaut de Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copiez les fichiers construits de votre projet frontend dans le répertoire par défaut de Nginx
COPY ./frontend/dist/ /usr/share/nginx/html/

# Exposez le port 80 pour permettre l'accès au serveur web
EXPOSE 80
EXPOSE 443
