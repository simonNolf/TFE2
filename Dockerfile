# Use the official Apache image
FROM httpd:latest

# Copy your Apache configuration file to the default location
COPY apache2.conf /usr/local/apache2/conf/httpd.conf

# Copy the built frontend files to the default Apache document root
COPY ./frontend/dist/ /usr/local/apache2/htdocs/

# Enable Apache modules (example: rewrite module)

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443
