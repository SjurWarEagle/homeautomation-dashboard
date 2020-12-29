FROM node:15.3.0

RUN mkdir -p /project
WORKDIR /project

ADD . .

RUN npm install

EXPOSE 4200
ENTRYPOINT ["npm", "run", "start"]
