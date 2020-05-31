#!/bin/bash

set -ex

#@--- Function to authenticate to docker hub ---@#
docker_hub_auth() {
    if [[ $TRAVIS_BRANCH == "develop" ]]; then
        docker login -p=$DOCKER_HUB_PASSWD -u=$DOCKER_HUB_USERNM
    fi
}

#@--- Build docker image  and push---@#
build_and_push_image() {

    #@--- Build image for deployment ---@#
    echo "++++++++ Start building image +++++++++"
    if [[ $TRAVIS_BRANCH == "develop" ]]; then
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
