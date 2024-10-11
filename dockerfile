# Usar la imagen oficial de Node.js
FROM node:lts-alpine3.20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias de producción
RUN npm install --production

# Copiar todo el código de la aplicación
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["npm", "start"]