FROM node:13 AS builder

LABEL MAINTAINER = 'Daave <daave@widgetbot.io>'

WORKDIR /app

COPY . ./

RUN yarn install
RUN yarn build
RUN ls

FROM node:13-alpine as release

COPY --from=builder compiled compiled
COPY --from=builder package.json .
COPY --from=builder yarn.lock .

CMD yarn start
