# Utilisez l'image officielle Apache pour déployer votre application frontend
FROM httpd:latest

# Copiez les fichiers construits de votre projet frontend dans le répertoire par défaut d'Apache
COPY apache2.conf /etc/apache2/sites-available/apache2.conf
COPY ./frontend/dist/ /var/www/site

# Créez le répertoire sites-enabled
RUN mkdir /etc/apache2/sites-enabled

# Activez le site dans la configuration d'Apache
RUN ln -s /etc/apache2/sites-available/apache2.conf /etc/apache2/sites-enabled/apache2.conf

# Exposez le port 80 pour permettre l'accès au serveur web
EXPOSE 80
EXPOSE 443

# Démarrez Apache au sein du conteneur
CMD ["httpd-foreground"]
