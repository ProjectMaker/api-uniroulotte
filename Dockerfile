FROM node:11.10.1-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start"]
