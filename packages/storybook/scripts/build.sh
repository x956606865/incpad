#!/usr/bin/env bash
script_path=$(cd $(dirname $0) && pwd -P)
project_path="$script_path/.."

cd ${project_path}

#define error handle function
check_err(){
    if [ $? != "0" ]
    then
        echo $1
        exit 1
    fi
}

# stop server
docker stop nginx
docker rm nginx
# re-fetch
git pull
check_err "git pull failed"
# re-install
npm i
check_err "npm install failed"
# build
npm run build-storybook
check_err "build project failed"
# run server
docker run -p 80:80 --name nginx -v "$project_path/storybook-static":/usr/share/nginx/html:ro -d nginx
check_err "docker nginx start failed"