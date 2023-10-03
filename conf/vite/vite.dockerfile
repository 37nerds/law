FROM node:18-alpine

RUN apk add --no-cache libc6-compat
RUN apk update

RUN npm install -g pnpm

ENV PNPM_HOME=/app/.pnpm
ENV PATH=$PATH:$PNPM_HOME

WORKDIR /app

COPY ./../../web/package.json .
COPY ./../../web/pnpm-lock.yaml .

RUN pnpm install
