## Utilizza un'immagine di base che contiene già le dipendenze installate
#FROM node:18.12.1
#
## Imposta la variabile d'ambiente DB_HOST
#ENV DB_HOST=db
#
#LABEL authors="Lorenzo Destriere"
#
## Imposta la directory di lavoro all'interno del container
#WORKDIR /app
#
## Copia i file di dipendenza del progetto
#COPY package*.json ./
#
## Copia il file package-lock.json, se presente
#COPY package-lock.json ./
#
## Copia il file tsconfig.json
#COPY tsconfig.json ./
#
## Copia la directory node_modules dal tuo ambiente di sviluppo al container
#COPY node_modules/ ./node_modules/
#
## Copia i file sorgente del progetto
#COPY src/ ./src/
#
## Monta il codice sorgente del progetto all'interno del container
#VOLUME ["/app/src"]
#
## Avvia il server o l'applicazione
#CMD ["npm", "start"]

######################################################################################################################
# Fase di build
FROM node:18.12.1 AS builder

# Imposta la variabile d'ambiente DB_HOST
ENV DB_HOST=db

LABEL authors="Lorenzo Destriere"

WORKDIR /app

# Copia i file di dipendenza e il file package.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il codice dell'applicazione
COPY . .

# Compila l'applicazione Nest.js
RUN npm run build

CMD ["npm", "start"]
