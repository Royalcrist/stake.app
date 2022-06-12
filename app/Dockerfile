FROM node:17.9

WORKDIR /frontend

COPY ./package.json /frontend/

RUN yarn install

COPY . .

CMD [ "yarn", "dev" ]