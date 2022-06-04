FROM node:17.9

WORKDIR /frontend

COPY ./package.json /frontend

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]