FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

RUN npm run build

CMD [ "npm", "run", "start:dev" ]

EXPOSE 4000