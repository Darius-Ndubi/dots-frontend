#!/bin/bash

set -ex

#@--- Function to setup the cluster ---@#
set_up_cluster_dev_env() {

    if [[ $TRAVIS_BRANCH == "develop" ]]; then

        #@--- Initialize terraform ---@#
        echo " ----- inititalize the backend --------- "
        terraform init -backend-config "bucket=$BACKEND_BUCKET" \
            -backend-config "key=$STATE_FILE_DEV_ENV" \
            -backend-config "access_key=$SPACES_ACCESS_KEY" \
            -backend-config "secret_key=$SPACES_SECRET_KEY"

        #@--- Run terraform command to plan infrastructure ---@#
        echo "----- show plan -------------------"
        terraform plan -lock=false -target=digitalocean_kubernetes_cluster.cluster \
             -var "cluster_name=$CLUSTER_NAME_DEV_ENV" \
            -var "cluster_region=$CLUSTER_REGION" \
            -var "kubernetes_version=$K8S_VERSION" \
            -var "node_type=$NODE_TYPE" \
            -var "max_node_number=$MAX_NODE_NUM" \
            -var "min_node_number=$MIN_NODE_NUM" \
            -var "digital_ocean_token=$SERVICE_ACCESS_TOKEN" \
            -var "db_size=$DB_SIZE" \
            -var "postgres_version=$PG_VERSION" \
            -var "db_name=$DB_NAME_DEV_ENV" \
            -var "tags=$PROJECT_NAME"

        #@--- Apply the changes ---@#
        echo "+++++ Apply infrastructure ++++++++++"
        terraform apply -lock=false -auto-approve -target=digitalocean_kubernetes_cluster.cluster \
            -var "cluster_name=$CLUSTER_NAME_DEV_ENV" \
            -var "cluster_region=$CLUSTER_REGION" \
            -var "kubernetes_version=$K8S_VERSION" \
            -var "node_type=$NODE_TYPE" \
            -var "max_node_number=$MAX_NODE_NUM" \
            -var "min_node_number=$MIN_NODE_NUM" \
            -var "digital_ocean_token=$SERVICE_ACCESS_TOKEN" \
            -var "db_size=$DB_SIZE" \
            -var "postgres_version=$PG_VERSION" \
            -var "db_name=$DB_NAME_DEV_ENV" \
            -var "tags=$PROJECT_NAME" \
            || echo "Resources exist"
    fi
}

#@--- Clone infrastructure repo ---@#
clone_infrastructure_repo() {
    git clone -b infrastructure_1 $INFRASTRUCTURE_REPO
}

#@--- Main function ---@#
main() {

    if [[ $TRAVIS_EVENT_TYPE != "pull_request" ]]; then
        #@--- Run infrastructure script function ---@#
        clone_infrastructure_repo

        cd deployment-files/terraform

        #@--- Run the setup dev-env cluster function ---@#
        set_up_cluster_dev_env

    fi

}

#@--- Run the main function ---@#
main
