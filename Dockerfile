FROM node:lts
ENV MODEL_URL=https://storage.googleapis.com/submissionmlgc-fakhrifitra/model.json
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install 
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node
CMD ["node", "run","index.js"]
