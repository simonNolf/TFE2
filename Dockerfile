# Utilize the official Apache image to deploy your frontend application
FROM httpd:latest

# Install required packages
RUN apt-get update && apt-get install -y nano

# Enable Apache modules
RUN ln -s /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/rewrite.load

# Copy Apache configuration file
COPY apache2.conf /etc/apache2/sites-available/000-default.conf

# Copy the built files of your frontend project into the default Apache web directory
COPY ./frontend/dist/ /var/www/html/

# Expose ports
EXPOSE 80
EXPOSE 443
