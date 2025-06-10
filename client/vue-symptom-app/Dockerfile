FROM node:18 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_PATIENTS_SERVICE_URL
ARG VITE_SYMPTOMS_SERVICE_URL
ENV VITE_PATIENTS_SERVICE_URL=$VITE_PATIENTS_SERVICE_URL
ENV VITE_SYMPTOMS_SERVICE_URL=$VITE_SYMPTOMS_SERVICE_URL

# Dar permisos al binario vite (por si acaso)
RUN chmod +x ./node_modules/.bin/vite

# Ejecutar build usando npx para garantizar que vite local se ejecute con permisos
RUN npx vite build

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
