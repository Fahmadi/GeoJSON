FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install --production

COPY . /app

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
