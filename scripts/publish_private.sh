#强制登录
npm login --registry=http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:7001
#发布模块到仓库
lerna publish --registry=http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:7001
#获取分支名称
brach_name=`git symbolic-ref --short -q HEAD`
#auto upload
npm run release