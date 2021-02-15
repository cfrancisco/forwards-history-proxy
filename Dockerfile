FROM node:10-alpine

COPY package.json .
COPY package-lock.json .
COPY src ./src

RUN npm install

CMD ["node", "src/index.js"]