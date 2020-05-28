#!/usr/bin/env bash
yarn build --mode development
http-server dist
