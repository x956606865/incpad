### Usage
* base模块   
    > ```const base=require("@incpad/react-native-tools/tools/base")```  
    or
    > ```const {base}=require("@incpad/react-native-tools")```
    * base.isAndroid():是否为安卓平台
    * base.isIOS():是否为ios平台
    * base.isIphoneX():是否为iPhoneX机型
    
* geo模块
    > ```const geo=require("@incpad/react-native-tools/tools/geo")```  
    or
    > ```const {geo}=require("@incpad/react-native-tools")```
    
    * geo.getGeo(cbSucc:function,cbErr:function):获取用户地址，传入成功与失败的回调函数