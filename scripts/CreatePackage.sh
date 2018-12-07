prefix="@incpad"
rootDir=`pwd`
package_name="${prefix}/$1"
base_dep=(
    base-tool
    validator
    error-handle
)
checkErr(){
if [ "$?" = "0" ]; then
   echo "success"
else
   echo $1 1>&2
   exit 1
fi
}

#init dir
mkdir packages/$1
checkErr "mkdir failed"
cd packages/$1
yarn init -y
checkErr "init failed"


#init README
echo -e "### usage\n* 待补充" > README.md

#move template file to dir
cp ${rootDir}/scripts/template/error.schema.js ./
checkErr "mv template failed"
cp ${rootDir}/scripts/template/validator.schema.js ./
checkErr "mv template failed"
cp ${rootDir}/scripts/template/template.js ./index.js
checkErr "mv template failed"


#add scope to package.json
cat package.json | sed s/$1/"${prefix}\/$1"/ > tmp
checkErr "replace name failed"
rm package.json
mv tmp package.json

# add base dep
for dep in ${base_dep[@]};
do
    lerna add ${prefix}/${dep} --scope="$package_name" # optional
    checkErr "add dep failed"
done
#lerna add ${prefix}/base-tool --scope="$package_name" # optional
#
#lerna add ${prefix}/validator --scope="$package_name" # optional
#checkErr "add dep failed"
#lerna add ${prefix}/error-handle --scope="$package_name" # optional
#checkErr "add dep failed"

echo "create package ${prefix}/$1 success!"

