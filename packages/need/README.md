### Usage
对于普通node程序来说，由于允许随时调用require注入，所以只需要如此：
```$xslt
const {need} =require("@incpad/need")
const _=need("lodash")
_.get({},"xxx")
```
如果传入第二个参数，即给与指定的上下文，如果第二个参数是个对象，
便会将该库注入到对应的对象中
```$xslt
const {need} =require("@incpad/need")
let test={}
need("lodash",test)
console.log(test.lodash)
```

对于babel系列的程序，由于需要编译处理，所以require不可以接受变量作为参数，所以需要特定的adapter作为处理  

同时，如果想要注入自己写的js文件而不是node_modules里的模块，也需要添加对应的adapter作为处理

下面给出adapter文件示例:
```$xslt
module.exports={
    tester:moduleName=>true,
    getMod:moduleName=>mod
}
```
调用need函数时，程序遍历内部的adapter数组，将模块名传入tester函数，如果返回true，则代表该adapter可以处理该模块，  
然后程序会调用对应的getMod方法，该方法应该返回需求的模块。


通过如下方式可以将自定义adapter添加到adapter数组中(以unshift的方式):

```$xslt
const {need,addAdapter} =require("@incpad/need")
const cusAdapter=reuqire("./addAdapter.js")
addAdapter(cusAdapter)
```
如果对应adapter格式不正确，会抛出对应错误