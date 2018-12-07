
checkErr(){
if [ "$?" = "0" ]; then
   echo "success"
else
   echo $1 1>&2
   exit 1
fi
}

#获取分支名称
brach_name=`git symbolic-ref --short -q HEAD`
#先进行一次推送，保证远程分支存在
git push origin ${brach_name}
checkErr "首次推送失败"
#强制登录
npm login --registry=http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:7001
checkErr "登录npm失败"
#发布模块到仓库
lerna publish --registry=http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:7001
checkErr "lerna发布失败"
#auto upload
npm run release
checkErr "版本更新、changelog生成失败"
#推送新的tag以及changelog到git
git push --follow-tags origin ${brach_name}
checkErr "最终推送失败"
#发布总模块到仓库
#npm publish --registry=http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:7001
echo "发布成功"