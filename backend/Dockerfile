FROM node:alpine

WORKDIR /server

COPY package.json .

RUN npm install --force

COPY . ./

EXPOSE 3001 

CMD ["npm", "start"]

