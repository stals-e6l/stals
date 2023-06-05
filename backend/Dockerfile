FROM node:alpine

WORKDIR /server

COPY package-lock.json .
COPY package.json .
RUN yarn set version stable

RUN yarn install

COPY . ./

EXPOSE 3001 

CMD ["yarn", "start"]

