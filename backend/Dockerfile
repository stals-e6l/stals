FROM node:18-alpine3.17

RUN mkdir -p /server

WORKDIR /server

COPY . .

EXPOSE 5000
RUN npm install
RUN npm run start:dev


