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

# Copy application files
COPY . .

# Build application deployment version
RUN yarn build --mode development

# Build the application final image with the base alpine image
FROM node:12-alpine

WORKDIR /dots-web

# update the Alpine image and install nano, bash and yarn serve package globally
RUN apk update && apk add nano bash && \
    yarn global add serve

# copy dependencies and the dist/ directory from the previous build stage.
# copy package.json file
COPY --from=build /dots-web/node_modules ./node_modules/
COPY --from=build /dots-web/dist ./dist
COPY package.json  .
COPY .env.development.local .

# Expose port for app accessibilty
EXPOSE 5000

# Run app when the container launches
CMD ["yarn", "run", "serve:deploy"]
