#!/bin/bash
prefix="@incpad"

#init dir
mkdir packages/$1
cd packages/$1
yarn init -y

#init README
echo -e "### usage\n* 待补充" > README.md

#move template file to dir
cp ../../scripts/template/error.schema.js ./
cp ../../scripts/template/validator.schema.js ./
cp ../../scripts/template/template.js ./index.js

#add scope to package.json
cat package.json | sed s/$1/"${prefix}\/$1"/ > tmp
rm package.json
mv tmp package.json

# add base dep
lerna add ${prefix}/base-tool --scope="${prefix}/$1" # optional
lerna add ${prefix}/validator --scope="${prefix}/$1" # optional
lerna add ${prefix}/error-handle --scope="${prefix}/$1" # optional