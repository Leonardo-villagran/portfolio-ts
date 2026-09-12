# Utilizar una imagen de Node.js como base
FROM node:22-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias (ci para builds reproducibles)
RUN npm ci

# Copiar el resto de los archivos de la aplicación
COPY . .

# Ejecutar el comando build
RUN npm run build

# Exponer el puerto 4173
EXPOSE 4173

# Comando para iniciar la aplicación
CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173" ]
