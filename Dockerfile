FROM node:10.15.3

WORKDIR /usr/src/app

RUN yarn global add pm2

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8080

CMD yarn build && pm2-runtime dist/app.js
