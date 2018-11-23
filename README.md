# Incpad

#### 项目介绍
incpad 

#### 软件架构
软件架构说明


#### 安装教程

```
lerna bootstrap
```



#### 使用说明

##### 1) 开发新package
1. xxxx

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
#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
