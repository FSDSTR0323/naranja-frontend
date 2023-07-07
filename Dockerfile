# Establece la imagen base adecuada para tu proyecto frontend
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app/frontend

# Copia los archivos de tu proyecto frontend al contenedor
COPY . .

# Instala las dependencias del frontend
RUN npm install

# Construye los archivos estáticos del frontend
RUN npm run build

# Expone el puerto en el que se ejecuta tu aplicación frontend
EXPOSE 8000

# Define el comando de inicio para servir los archivos estáticos
CMD ["npm", "run"]
