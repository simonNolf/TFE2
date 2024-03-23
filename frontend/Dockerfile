# Utilisez l'image officielle Apache pour déployer votre application frontend
FROM httpd:latest

# Copiez votre fichier httpd.conf dans le répertoire de configuration d'Apache dans l'image Docker
COPY httpd.conf /usr/local/apache2/conf/httpd.conf

# Copiez les fichiers construits de votre projet frontend dans le répertoire par défaut d'Apache
COPY dist/ /usr/local/apache2/htdocs/

# Copiez votre fichier CSV dans le répertoire htdocs pour le rendre accessible via le serveur web
COPY data.csv /usr/local/apache2/htdocs/

# Exposez le port 80 pour permettre l'accès au serveur web
EXPOSE 80
