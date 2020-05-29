FROM node:13 AS builder

LABEL MAINTAINER = 'Daave <daave@widgetbot.io>'

WORKDIR /app

COPY . ./

RUN yarn install
RUN yarn build
RUN ls

FROM node:13-alpine as release

COPY --from=builder /app/compiled compiled
COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .

RUN yarn --production-only
CMD yarn start
