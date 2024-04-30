FROM node:18.12-alpine3.16

WORKDIR $PROJECT_DIR

COPY . .

RUN npm install
RUN npm install --save sequelize
RUN npm install --save pg pg-hstore

EXPOSE 8080

CMD [ "nodemon","." ]