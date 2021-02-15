FROM node:12.18.2 as basis

#Set the Dojot version
ARG DOJOT_VERSION='undefined'
ENV DOJOT_VERSION $DOJOT_VERSION

#Set the PORT
ARG PORT='3000'
ENV PORT $PORT

#Set the URL to access Retriever
ARG RETRIEVER_URL=''
ENV RETRIEVER_URL $RETRIEVER_URL

COPY package.json .
COPY src ./src

RUN npm install

CMD ["node", "src/index.js"]