FROM node:alpine as base

WORKDIR /app

COPY package.json  ./

RUN rm -rf node_modules 
RUN npm install --frozen-lockfile 
#RUN npm cache clean

COPY . .
#EXPOSE 3000
EXPOSE 8000

CMD ["node", "./server.js"]