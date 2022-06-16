FROM node:17.9

WORKDIR /truffle

COPY ./package.json .

RUN npm install

RUN npm install -g truffle

COPY ./contracts .

COPY . .


