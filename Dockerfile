# Utilisez l'image officielle Apache HTTP Server
FROM httpd:latest

# Définissez la variable d'environnement APACHE_LOG_DIR
ENV APACHE_LOG_DIR /usr/local/apache2/logs

# Créez le répertoire DocumentRoot
RUN mkdir -p /var/www/html/dist

# Créez le répertoire des logs
RUN mkdir -p /usr/local/apache2/logs

# Copiez le fichier .htaccess dans le répertoire par défaut d'Apache
COPY .htaccess /var/www/html/dist/

# Copiez les fichiers construits de votre projet frontend dans le répertoire par défaut d'Apache
COPY ./frontend/dist/ /var/www/html/dist/

# Copiez le fichier de configuration Apache personnalisé
COPY apache2.conf /usr/local/apache2/conf/httpd.conf

# Activer le module rewrite
RUN sed -i 's/#LoadModule\ rewrite_module/LoadModule\ rewrite_module/' /usr/local/apache2/conf/httpd.conf

# Activer le module log_config
RUN sed -i 's/#LoadModule\ log_config_module/LoadModule\ log_config_module/' /usr/local/apache2/conf/httpd.conf

# Exposez le port 80
EXPOSE 80

# Commande de démarrage d'Apache
CMD ["httpd", "-D", "FOREGROUND"]