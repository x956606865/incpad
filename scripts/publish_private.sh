#获取分支名称
brach_name=`git symbolic-ref --short -q HEAD`
#先进行一次推送，保证远程分支存在
git push origin ${brach_name}
#强制登录
npm login --registry=http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:7001
#发布模块到仓库
lerna publish --registry=http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:7001

#auto upload
npm run release
#推送新的tag以及changelog到git
git push --follow-tags origin ${brach_name}
#发布总模块到仓库
npm publish --registry=http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:7001