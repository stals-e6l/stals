FROM node:alpine
RUN mkdir -p /server
COPY package.json /server
WORKDIR /server
RUN npm i 
COPY . /server
EXPOSE 5000
CMD ['npm', 'start:dev']