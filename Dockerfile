FROM node:lts as builder
WORKDIR /app
COPY . .
RUN yarn install
RUN npx prisma generate
RUN yarn build
EXPOSE 3000
EXPOSE 3306
CMD [ "yarn" , "start:dev" ]
