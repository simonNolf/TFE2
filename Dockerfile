# Utilisez l'image officielle Apache pour déployer votre application frontend
FROM httpd:latest
RUN a2enmod rewrite

# Copiez les fichiers construits de votre projet frontend dans le répertoire par défaut d'Apache
COPY apache2.conf /etc/apache2/sites-available/apache2.conf
COPY ./frontend/dist/ /var/www/site
RUN a2ensite apache2.conf

# Exposez le port 80 pour permettre l'accès au serveur web
EXPOSE 80
EXPOSE 443