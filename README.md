# Incpad

#### 项目介绍
incpad内部整理的工具库、组件库、二次封装库等等

#### 软件架构

* 所有的内部项目都放到package目录中自成目录
* 统一使用lerna进行整个项目的管理
* 每个项目需包含test目录，然后包含足够的*.spec.js测试文件
* 每个项目需包含一个Readme文件，并在本文件中链接指向
* 每个项目的包名必须为@incpad/xxxx


#### 安装教程

```
lerna bootstrap
```



#### 使用说明

##### 1) 开发新package
1. 假设新项目名为example
2. 新建并切换至分支Feat_package_example
3. 在packages目录下新建目录example
4. 使用```yarn init -y```快速初始化项目
5. 修改packages.json中项目名为@incpad/example
6. 使用```lerna add xxx --scope=@incpad/example```为项目安装相关的依赖
7. 进行代码开发
8. 新建test目录，为项目撰写测试用例
9. 运行```npm run publish```将项目上传到私有npm中
10. 提交PR合并项目

ps: 
* 项目编写以及上传时必须经过eslint的测试
* 项目上传时，应将文件add到git的暂存区，然后```npm run commit```进行上传，从而保证eslint以及commit message规范化
* 需要在全局安装prettier
* 在发布时需要登录私有npm仓库，账号incpad,无密码，邮箱incpad@cpm.com


##### 2） 安装package
```$xslt
npm --registry=http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:7001 install @incpad/packageName 
```
可以选择在zshrc中设置alias:
```$xslt
alias pnpm="npm --registry=http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:7001"
```
这样就可以直接这样安装:
```$xslt
pnpm install @incpad/packageName
```
##### 3) 使用package
* [base-tool](./packages/base-tool/README.md):基础工具库，为其他package提供功能支持
* [error-handle](./packages/error-handle/README.md):提供定义式的错误处理库
* [validator](./packages/validator/README.md):提供定义式的对象校验功能
* [data-tool](./packages/data-tool/README.md):提供各种数据模型、算法模型，用于优化
* [decorators](./packages/decorators/README.md):提供一系列的装饰器函数，用于加快开发速度
* [need](./packages/need/README.md):快速依赖注入工具
* [react-native-components](./packages/react-native-components/README.md):react-native组件库
* [react-native-tools](./packages/react-native-tools/README.md):react-native工具函数库
#### 相关资料
[lerna](https://github.com/lerna/lerna#getting-started)  
[项目规范化lint](https://www.notion.so/aj0k3r/57b80f3f75b741e3a54546c20ae5e8e7)  
[私有npm地址](http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:7001)  
[私有API管理后台地址](http://ec2-18-221-5-8.us-east-2.compute.amazonaws.com:8300)
#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
