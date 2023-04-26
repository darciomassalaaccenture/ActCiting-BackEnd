FROM alpine:latest
ENV PGUSER=postgres
ENV PGHOST=localhost
ENV PGPASSWORD=mysecretpassword
RUN apk add --update nodejs npm
WORKDIR ./actCitingApi
COPY ./package* .
COPY ./*.js .
RUN npm install
EXPOSE 3001
ENTRYPOINT [ "node", "server.js" ]