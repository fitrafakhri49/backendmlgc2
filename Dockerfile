FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .env
ENV PORT=3000
ENV MODEL_URL=https://storage.googleapis.com/submissionmlgc-fakhrifitra/model.json


COPY . .

CMD [ "npm", "run", "start"]
