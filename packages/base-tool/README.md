### Usage

* base相关  
    - CreateSymbolTool  
        > const {CreateSymbolTool}=require("@incpad/base-tool")  
        
        用于创建一个symbol对象表来简单隐藏内部私有属性:
        
        ```ecmascript 6
              const {CreateSymbolTool}=require("@incpad/base-tool")
              const symbolTable=CreateSymbolTool([      
                  "innerProp1",
                  "innerMethod1"
                ])
              class A{
                  constructor(){
                      this[symbolTable.innerProp1]="xxxx"
                      this.publishProp2="xxxx"
                  }
                  [symbolTable.innerMethod1](){
                      //xxxx
                  }
                  publicMethond2(){
                      //xxxx
                  }
              }
        ```
    - getValueFromEnv
        > const {getValueFromEnv}=require("@incpad/base-tool")  
        
        用于从process.env中读取环境变量信息，第二个参数可以给予一个默认值，用于处理环境变量不存在的情况
        ```ecmascript 6
              const {getValueFromEnv}=require("@incpad/base-tool")
              const PATH=getValueFromEnv("PATH","") //获取环境变量PATH，如果没有就赋予空字符串
        ```
        
    - getRuntimePlatform
        > const {getRuntimePlatform}=require("@incpad/base-tool")
        
        返回当前运行的环境，目前可识别的为Node、Jest、browser、ReactNative（结果不保证一定正确）
        
    - constant
        > const {constant}=require("@incpad/base-tool")
        
        返回一个对象，包含@incpad项目中所有用到的常量
* path相关  
    - convertPathWithinCustomRootDir
        > const {convertPathWithinCustomRootDir}=require("@incpad/base-tool") 
        
        等同于原生的path.resolve
        
    - checkExist
        > const {checkExist}=require("@incpad/base-tool") 
        
        传入一个路径字符串，判断对应路径是否存在或者对应文件是否存在
        ps:依赖fs.accessSync，同步，且如果没有读写权限，则默认文件或路径不存在
* debug相关
    ps:debug相关函数全是对于debug库的一个二次封装
    - tap
        > const {tap}=require("@incpad/base-tool/tools/debug") 
        
        用法等同于console.log，但是会原样返回输入的参数，所以可以无痛的插入代码链中，且默认只在dev模式输出内容
        
        ```ecmascript 6
            const {tap}=require("@incpad/base-tool/tools/debug") 
            function a(c,d){      
                  //xxxx
            }
            const e=123,f=otherVar
            a(e,tap(f))
        ```
        ps:如果给tap传入多个参数，返回值会合并为数组，需要使用展开运算符展开
    - updateOptions
        > const {updateOptions}=require("@incpad/base-tool/tools/debug")
        
        用于更新debug的一些配置，比如关闭debug相关函数只在dev模式输出的设置:
        ```ecmascript 6 
            const {updateOptions}=require("@incpad/base-tool")
            updateOptions({
                RUN_ONLY_DEBUG:false
            })
        ```
    - addNewDebugger & getCustomDebugger
        > const {addNewDebugger,getCustomDebugger}=require("@incpad/base-tool/tools/debug")
        
        对debug的一个封装，新建一个debug对象以及获取一个debug对象
        
        ```ecmascript 6
              const {addNewDebugger,getCustomDebugger}=require("@incpad/base-tool/tools/debug")
              addNewDebugger("test")
              const testDebugger-getCustomDebugger("test")
              testDebugger("some thing to output")
        ```
    由于debug输出默认会显示与上一次相同debugger输出的间隔，所以也可以用来测量两次操作花费的时间
    ```ecmascript 6
      addNewDebugger("exampleTimeTest");
      const a = getCustomDebugger("exampleTimeTest");
      
      function test() {
          a("asdsadd");
      }
      
      test();
      setTimeout(test, 700);
    //output:
    // exampleTimeTest asdsadd +0ms
    // exampleTimeTest asdsadd +708ms
    ```
    
* wrapper相关:
    - doWrap 包裹传入的函数，返回包装后的函数，为其添加异步的AOP钩子
        ```ecmascript 6
          const { doWrap } = require('@incpad/base-tool/tools/wrapper');
          function func(){
              console.log("run")
          }
          const newFunc=doWrap(func, {
                  before: console.log.bind(null,"before"),
                  after: console.log.bind(null,"after"),
                  context,
              })
          newFunc("runData")
        ```
        
        被加入的before和after可以是Promise异步，最后的返回值是func的返回值,三个函数都只会接收到原始参数，即例子中的"runData"
      
    - doWrapAndPipeData 包裹传入的函数，返回包装后的函数，为其添加异步的AOP钩子
    
            ```ecmascript 6
              const { doWrapAndPipeData } = require('@incpad/base-tool/tools/wrapper');
              function func(){
                  console.log("run")
              }
              const newFunc=doWrapAndPipeData(func, {
                      before: console.log.bind(null,"before"),
                      after: console.log.bind(null,"after"),
                      context,
                  })
              newFunc("runData")
            ```
            
            类似doWrap，但是三个函数接受到的参数都是上一个函数的返回值，最后的返回值是after的返回值