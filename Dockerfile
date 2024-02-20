# Use the official Apache image
FROM httpd:latest

# Copy your Apache configuration file to the default location for virtual hosts
COPY apache2.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf

# Copy the built frontend files to the default Apache document root
COPY ./frontend/dist/ /usr/local/apache2/htdocs/

# Enable Apache modules
RUN sed -i '/#LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Include the virtual hosts configuration in the main configuration file
RUN echo "Include conf/extra/httpd-vhosts.conf" >> /usr/local/apache2/conf/httpd.conf

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443
