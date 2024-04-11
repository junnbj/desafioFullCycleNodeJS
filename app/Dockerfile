FROM node:14-alpine

# Instale as dependências necessárias (wget) e o dockerize
RUN apk add --no-cache wget \
    && wget -qO- https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz | tar xvz \
    && mv dockerize /usr/local/bin/dockerize
WORKDIR /app

COPY package.json ./

# Instale as dependências do projeto
RUN npm install

COPY . .

#CMD ["node", "index.js"]
CMD dockerize -wait tcp://mysql:3306 -timeout 30s npm start
