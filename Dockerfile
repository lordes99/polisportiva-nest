# Utilizza un'immagine di base che contiene già le dipendenze installate
FROM node:18.12.1

LABEL authors="Lorenzo Destriere"

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia i file di dipendenza del progetto
COPY package*.json ./

# Copia il file package-lock.json, se presente
COPY package-lock.json ./

# Copia il file tsconfig.json
COPY tsconfig.json ./

# Copia la directory node_modules dal tuo ambiente di sviluppo al container
COPY node_modules/ ./node_modules/

# Copia i file sorgente del progetto
COPY src/ ./src/

# Monta il codice sorgente del progetto all'interno del container
VOLUME ["/app/src"]

# Avvia il server o l'applicazione
CMD ["npm", "start"]


## Usa l'immagine base di Node.js
#FROM node:18.12.1
#
## Imposta il percorso di lavoro all'interno del contenitore
#WORKDIR /app
#
## Copia i file di dipendenza del progetto
#COPY package*.json ./
#
## pulisce la cache
#RUN rm -rf node_modules && npm cache clean --force
#
## Installa le dipendenze
#RUN npm install
#
## Copia il codice sorgente nell'immagine
#COPY . .
#
## Compila il progetto TypeScript
#RUN npm run build
#
## Esponi la porta specificata dalla tua applicazione NestJS
#EXPOSE 3000
#
## Avvia l'applicazione quando il contenitore viene eseguito
#CMD ["node", "dist/main"]
