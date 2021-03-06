FROM node:11.10.1-alpine
RUN apk update && apk add make

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT [ "make" ]
CMD ["run_dev"]
