# Utiliser l'image officielle Apache avec PHP pour déployer votre application frontend
FROM php:apache

# Copiez le fichier .htaccess dans le répertoire par défaut d'Apache
COPY .htaccess /var/www/html/

# Copiez les fichiers construits de votre projet frontend dans le répertoire par défaut d'Apache
COPY ./frontend/dist/ /var/www/html/

# Copiez le fichier de configuration Apache personnalisé
COPY apache2.conf /etc/apache2/apache2.conf

# Activer le module rewrite (peut ne pas être nécessaire, car il est généralement déjà activé)
RUN a2enmod rewrite

# Exposez le port 80 pour permettre l'accès au serveur web
EXPOSE 80
