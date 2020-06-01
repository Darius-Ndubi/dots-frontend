# base image
FROM node:12-alpine AS build

# the working directory where the application would be started
WORKDIR /dots-web

# The Yarn.lock and package.json file is copied so that the versions
# in the package.json are not upgraded from what is present in the
# local package.json to a higher version in the container image.
COPY yarn.lock .
COPY package.json .

# update the Alpine image and install nano
RUN apk update && apk add nano

# install application dependancies
RUN yarn install

# Build the application final image with the base alpine image
FROM node:12-alpine

# Working directory
WORKDIR /dots-web

# update the Alpine image and install nano and bash
RUN apk update && apk add nano bash

# copy dependencies and the dist/ directory from the previous build stage.
COPY --from=build /dots-web/node_modules ./node_modules/

# Copy all files from the root directory into the image
COPY . .

RUN mv .env.development .env.development.local
