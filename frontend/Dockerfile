# Utilisation de l'image officielle Apache pour déployer votre application frontend
FROM httpd:latest

# Copie des fichiers construits de votre projet frontend dans le répertoire par défaut d'Apache
COPY apache2.conf /usr/local/apache2/conf/apache2.conf
COPY dist/ /usr/local/apache2/htdocs/

# Exposition du port 80 pour permettre l'accès au serveur web
EXPOSE 80
