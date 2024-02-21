# Utilisez l'image officielle Apache HTTP Server
FROM httpd:latest

# Définissez la variable d'environnement APACHE_LOG_DIR
ENV APACHE_LOG_DIR /usr/local/apache2/logs

# Copiez le fichier .htaccess dans le répertoire par défaut d'Apache
COPY .htaccess /usr/local/apache2/htdocs/

# Copiez les fichiers construits de votre projet frontend dans le répertoire par défaut d'Apache
COPY ./frontend/dist/ /usr/local/apache2/htdocs/

# Copiez le fichier de configuration Apache personnalisé
COPY apache2.conf /usr/local/apache2/conf/httpd.conf

# Activer le module rewrite
RUN sed -i 's/#LoadModule\ rewrite_module/LoadModule\ rewrite_module/' /usr/local/apache2/conf/httpd.conf

# Exposez le port 80 pour permettre l'accès au serveur web
EXPOSE 80

# Commande de démarrage d'Apache
CMD ["httpd", "-D", "FOREGROUND"]
