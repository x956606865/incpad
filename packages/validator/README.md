### Usage

```$xslt
    const {Validator, initValidatorWithFile} = require("@incpad/validator")
    initValidatorWithFile("./validator.schema.js");
```
导入的js文件应该像这样的：
```$xslt
module.exports = {
    schemaList: {
        testSchema: {
            code: {
                type: 'number',
                min: 1000,
            },
            msg: 'string',
            name: 'string'
        },
    },
    customCheckerList: {
        existPath,
    },
    customMessages: {
        existPathError: 'path not exist',
    },
};
```
其中的schemaList、customCheckerList、customMessages是必须的，  
schemaList是标准的验证对象格式定义、customCheckerList是自定义验证函数列表、
customMessages是自定义报错信息的列表。

或者也可以使用如下方式初始化:
```$xslt
const {Validator,initValidatorWithObject} = require("@incpad/validator")
initValidatorWithObject(object);
```
这个object对象等同于之前文件export出的对象

然后就可以使用如下方式进行验证：
```$xslt
Validator("testSchema", targetObject)
```
由于该库只是fastest-validator的再次封装，所以schema、返回值等等都和原库一致