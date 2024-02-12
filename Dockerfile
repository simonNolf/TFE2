# Utilisez l'image officielle Apache pour déployer votre application frontend
FROM httpd:latest

# Copiez les fichiers construits de votre projet frontend dans le répertoire par défaut d'Apache
COPY ./frontend/dist/ /usr/local/apache2/htdocs/

# Exposez le port 80 pour permettre l'accès au serveur web
EXPOSE 80
