# Utilisez l'image Node.js 14
FROM node:14

# Définit le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copie le fichier package.json et le fichier package-lock.json (si existant)
COPY package*.json ./

# Installe les dépendances, y compris express
RUN npm install express

# Installe nodemon globalement
RUN npm install -g nodemon

# Copie le reste du code source de votre application
COPY . .

# Commande à exécuter lorsque le conteneur démarre
CMD ["npm", "start"]
