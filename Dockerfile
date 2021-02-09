FROM node:12

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN yarn install
RUN yarn run build

EXPOSE 3000

ENV HOST 0.0.0.0
