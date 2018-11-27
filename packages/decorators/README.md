# `decorators`

> TODO: description

## Usage
定义了一系列的装饰器，来便捷处理各种情况

* aop :实现类函数的AOP处理
```$xslt
const AOP=require("@incpad/decorators/decorators/aop")
class test{
    @AOP({
       beforeFunc:()=>{
            console.log("before")
       },
       afterFunc:()=>{
            console.log("after")
       }
      })
     testMethod(){
        console.log("run")
     }
}
new test().testMethod()

//output:
//before
//run
//after
```

* color:实现色彩的快速处理（目前只实现了部分函数）
```$xslt
const {Hex2Rgba}=require("@incpad/decorators/decorators/color")

const style={
   @Hex2Rgba(50) backgroundColor:#ffffff
}
console.log(style.backgroundColor)
//output:
//"rgba(255,255,255,0.5)"
```

* need:基于@incpad/need工具的装饰器实现
```$xslt
const need=require("@incpad/decorators/decorators/need")
@need("lodash.isstring")
class test{

}
console.log(test)
//output:
//{
// dep:{
//      lodash:{
//          isstring:[Function object]
//      }
//  }
//}
```

* react-native-size:对于RN程序，快速将px转化为pt单位的装饰器  
比如如果设计图上标注宽度为50px，就可以这么写
```$xslt
const size=require("@incpad/decorators/decorators/size")
const style={
    @size("px2pt") width:50
}
```
同样如果是字体，也可以使用fpx2pt:
```$xslt
const size=require("@incpad/decorators/decorators/size")
const style={
    @size("fpx2pt") fontSize:20
}
```