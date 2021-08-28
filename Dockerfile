FROM node:16 as base

ENV NODE_ENV=production

WORKDIR /usr/app

COPY ["./package.json", "./package-lock.json*", "./"]

RUN ls -a

RUN npm install typescript -g 
RUN npm install rimraf -g 
RUN npm install

COPY . .

FROM base as production

RUN npm run build

CMD ["npm", "start"]
