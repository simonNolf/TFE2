# Utilisation de l'image officielle Apache2
FROM httpd:latest

# Supprimer le fichier de configuration par défaut d'Apache2
RUN rm /usr/local/apache2/conf/httpd.conf

# Copier le fichier de configuration principal personnalisé
COPY httpd.conf /usr/local/apache2/conf/

# Copier la configuration de virtual host
COPY test.conf /usr/local/apache2/conf/extra/

# Copier les fichiers frontend dans le répertoire web d'Apache2
COPY dist/ /usr/local/apache2/htdocs/

# Exposer le port 80
EXPOSE 80

# Commande pour démarrer Apache2 en mode daemon
CMD ["httpd", "-D", "FOREGROUND"]
