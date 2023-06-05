FROM node:alpine

WORKDIR /server

COPY package-lock.json .
COPY package.json .

RUN yarn install --force

COPY . ./

EXPOSE 3001 

CMD ["yarn", "start"]

