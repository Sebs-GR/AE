# symptom-tracker-monorepo/services/patients-service/Dockerfile

# Usar una imagen Node.js 18 basada en Alpine
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json (o yarn.lock)
# antes de instalar las dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo las de desarrollo como nodemon).
# Esto es necesario porque 'docker-compose.yml' usa 'npm run dev'
# que a su vez se basa en 'nodemon'.
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación Node.js se ejecutará
EXPOSE 3001

CMD ["npm", "start"]