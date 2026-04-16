FROM node:alpine

WORKDIR /brello-backend

COPY package*.json ./


COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

COPY .env /dist

CMD ["node", "dist/main"]






