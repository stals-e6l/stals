FROM node:alpine

WORKDIR /server

COPY package-lock.json .
COPY package.json .
RUN yarn set version stable

RUN yarn install --frozen-lockfile --force

COPY . ./

EXPOSE 3001 

CMD ["yarn", "start"]

