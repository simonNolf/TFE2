# Utilisez l'image officielle Apache pour déployer votre application frontend
FROM httpd:latest

# Installez les paquets nécessaires
RUN apt-get update && apt-get install -y nano

# Copiez les fichiers construits de votre projet frontend dans le répertoire par défaut d'Apache
COPY apache2.conf /usr/local/apache2/conf/httpd.conf
COPY ./frontend/dist/ /usr/local/apache2/htdocs/

# Exposez le port 80 pour permettre l'accès au serveur web
EXPOSE 80
