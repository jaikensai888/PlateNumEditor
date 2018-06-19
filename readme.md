# jt-editor

## usage

> npm install jt-editor

### propType

- placeholder:str
- onChange:Func(helper:Fuc)

  > help 提供的方法

  1.  getContent():获取 editor 内容
  2.  getIgnoreVehicle():获取被忽略的车辆
  3.  getVehicle():获取所有车辆
  4.  getSelectedVehicle():获取选中的车辆

## TODOList

- VehicleEditor

1.  tag 样式问题
1.  增加提示说明
1.  策略模式不能兼容相同策略

## version log

### ver 1.0.1

- VehicleEditor

1.  新增 PlaceHolder
1.  解决 tag 重复 key 问题
1.  editor 加入策略模式，识别车辆字体会有变红色字体
1.  onChange 返回 Function
1.  新增连号编写粤 x12345 34567 45678 识别

### ver 1.0.0

- VehicleEditor

1.  新增识别车牌号码,车架号识别功能;
