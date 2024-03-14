# Utilizar una imagen de Node.js como base
FROM node:alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json a la imagen
COPY package.json .

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Copiar las variables de entorno desde el archivo .env
ENV $(cat .env | grep -v ^# | xargs)

# Ejecutar el comando build
RUN npm run build

# Exponer el puerto 4173
EXPOSE 4173

# Comando para iniciar la aplicación
CMD [ "npm", "run", "preview" ]
