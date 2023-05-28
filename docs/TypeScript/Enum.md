---
title: TypeScript 枚举类型
author: 向阳
date: 2023-05-10
---

## 枚举类型

### 理解

枚举类型是为数不多的 TypeScript 特性有的特性之一：

- 枚举其实就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型；
- 枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型；

```js
//联合类型
// type Direction = "left" | "Right" | "Top" | "Bottom"

//枚举类型编程习惯：大写
//枚举类型的好处：代码阅读性好
enum Direction {
    LEFT,
    RIGHT,
    TOP,
    BOTTOM
}

function turnDirection(direction: Direction) {
switch (direction) {
 case Direction.LEFT:
   console.log("改变角色的方向向左")
   break;
 case Direction.RIGHT:
   console.log("改变角色的方向向右")
   break;
 case Direction.TOP:
   console.log("改变角色的方向向上")
   break;
 case Direction.BOTTOM:
   console.log("改变角色的方向向下")
   break;
 default:
   const foo: never = direction;
   break;
}
}

turnDirection(Direction.LEFT)
turnDirection(Direction.RIGHT)
turnDirection(Direction.TOP)
turnDirection(Direction.BOTTOM)
```

### 枚举类型的值

- 枚举类型默认是有值的，0、1、2 依次递增
- 如果只给第一个一个数值，后面的会依次递增。
- 我们也可以给他们赋值其他的类型

这个东西了解就好，一般用到枚举不会刻意去改变它的值。默认定义它的常量，在其他地方使用它的场景够用了，除非特殊场景

```js
enum Direction {
    LEFT = 0,
    RIGHT = 1,
    TOP = 2,
    BOTTOM = 3
}

enum Direction {
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    TOP = "TOP",
    BOTTOM = "BOTTOM"
}
```
