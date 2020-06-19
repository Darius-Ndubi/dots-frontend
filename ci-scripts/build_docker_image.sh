#!/bin/bash

set -ex

#@--- Function to authenticate to docker hub ---@#
docker_hub_auth() {
    if [[ $TRAVIS_BRANCH == "develop" ]] || \
        [[ $TRAVIS_BRANCH == "ISS-171" ]]; then
        docker login -p=$DOCKER_HUB_PASSWD -u=$DOCKER_HUB_USERNM
    fi
}

#@--- Build docker image  and push---@#
build_and_push_image() {

    #@--- Build image for develop deployment ---@#
    if [[ $TRAVIS_BRANCH == "develop" ]]; then
        echo "++++++++ Start building dev image +++++++++"

        rm -f .env.development
        touch .env.development.local
        echo NODE_ENV=${NODE_ENV_DEV} >> .env.development.local
        echo VUE_APP_BASE_API=${VUE_APP_BASE_API_DEV} >> .env.development.local
        echo VUE_APP_GEO_JSON_BASE_URL=${VUE_APP_GEO_JSON_BASE_URL_DEV} >> .env.development.local
        echo VUE_APP_MAPBOX_API_KEY=${VUE_APP_MAPBOX_API_KEY_DEV} >> .env.development.local
        echo VUE_APP_MAP_BOX_STYLE=${VUE_APP_MAP_BOX_STYLE_DEV} >> .env.development.local

        export APPLICATION_ENV=${APPLICATION_ENV_DEV}


        docker build -t $REGISTRY_OWNER/activity:$APPLICATION_NAME-$APPLICATION_ENV-$TRAVIS_COMMIT -f .docker/Dockerfile .
        echo "-------- Building Image Done! ----------"

        echo "++++++++++++ Push Image built -------"
        docker push $REGISTRY_OWNER/activity:$APPLICATION_NAME-$APPLICATION_ENV-$TRAVIS_COMMIT

    fi

    #@--- Build image for staging deployment ---@#
    if [[ $TRAVIS_BRANCH == "ISS-171-A" ]]; then
        echo "++++++++ Start building staging image +++++++++"

        rm -f .env.development
        touch .env.development.local
        echo NODE_ENV=${NODE_ENV_DEV} >> .env.development.local
        echo VUE_APP_BASE_API=${VUE_APP_BASE_API_STAGING} >> .env.development.local
        echo VUE_APP_GEO_JSON_BASE_URL=${VUE_APP_GEO_JSON_BASE_URL_DEV} >> .env.development.local
        echo VUE_APP_MAPBOX_API_KEY=${VUE_APP_MAPBOX_API_KEY_DEV} >> .env.development.local
        echo VUE_APP_MAP_BOX_STYLE=${VUE_APP_MAP_BOX_STYLE_DEV} >> .env.development.local

        export APPLICATION_ENV=${APPLICATION_ENV_STAGING}


        docker build -t $REGISTRY_OWNER/activity:$APPLICATION_NAME-$APPLICATION_ENV-$TRAVIS_COMMIT -f .docker/Dockerfile .
        echo "-------- Building Image Done! ----------"

        echo "++++++++++++ Push Image built -------"
        docker push $REGISTRY_OWNER/activity:$APPLICATION_NAME-$APPLICATION_ENV-$TRAVIS_COMMIT

    fi

    #@--- Build image for production deployment ---@#
    if [[ $TRAVIS_BRANCH == "ISS-171" ]]; then
        echo "++++++++ Start building production image +++++++++"

        sed -i "s/yarn build --mode development/yarn build/" .docker/Dockerfile
        sed -i "s/COPY .env.development.local ./COPY .env.production.local ./" .docker/Dockerfile

        rm -f .env.production
        touch .env.production.local
        echo NODE_ENV=${NODE_ENV_PROD} >> .env.production.local
        echo VUE_APP_BASE_API=${VUE_APP_BASE_API_PROD} >> .env.production.local
        echo VUE_APP_GEO_JSON_BASE_URL=${VUE_APP_GEO_JSON_BASE_URL_DEV} >> .env.production.local
        echo VUE_APP_MAPBOX_API_KEY=${VUE_APP_MAPBOX_API_KEY_PROD} >> .env.production.local
        echo VUE_APP_MAP_BOX_STYLE=${VUE_APP_MAP_BOX_STYLE_PROD} >> .env.production.local

        export APPLICATION_ENV=${APPLICATION_ENV_PROD}


        docker build -t $REGISTRY_OWNER/activity:$APPLICATION_NAME-$APPLICATION_ENV-$TRAVIS_COMMIT -f .docker/Dockerfile .
        echo "-------- Building Image Done! ----------"

        echo "++++++++++++ Push Image built -------"
        docker push $REGISTRY_OWNER/activity:$APPLICATION_NAME-$APPLICATION_ENV-$TRAVIS_COMMIT

    fi

    #@--- Logout from docker ---@#
    echo "--------- Logout dockerhub --------"
    docker logout
}


#@--- main function ---@#
main() {
    if [[ $TRAVIS_EVENT_TYPE != "pull_request" ]]; then
        #@--- Run the auth fucntion ---@#
        docker_hub_auth

        #@--- Run the build function ---@#
        build_and_push_image
    fi
}

#@--- Run the main function ---@#
main
