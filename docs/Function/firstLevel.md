---
title: 函数是一等公民
author: 向阳
date: 2023-04-19
---

## 函数是一等公民（头等公民）

### 一等公民的理解

什么是程序世界的一等公民？一等公民又有哪些特殊待遇呢？

- 我们可以从 MDN 对“First-Class Function”的阐释中找到答案

> 当一门编程语言的函数可以被当作变量一样用时，则称这门语言拥有头等函数。例如，在这门语言中，函数可以被当作参数传递给其他函数，可以作为另一个函数的返回值，还可以被赋值给一个变量。 ——MDN Web Docs

### 一等公民的待遇

#### js 函数可以被赋值给一个变量

callMe 被赋值为一个函数后，我们不仅可以通过添加两个圆括号来调用它，也可以像访问普通变量一样查看它的内容。

```js
// 将一个匿名函数赋值给变量 callMe
let callMe = () => {
  console.log("Hello World！");
};

// 输出 callMe 的内容
console.log(callMe);
// 调用 callMe
callMe();
```

#### JS 函数可以作为参数传递（即回调函数）

回调函数是 JS 异步编程的基础。在前端，我们常用的事件监听、发布订阅等操作都需要借助回调函数来实现。比如这样：

```js
function consoleTrigger() {
  console.log("spEvent 被触发");
}

jQuery.subscribe("spEvent", consoleTrigger);
```

而在 Node 层，我们更是需要回调函数来帮我们完成与外部世界的一系列交互（也就是所谓的“副作用”），比如异步读取文件。

```js
function showData(err, data) {
  if (err) {
    throw err;
  }
  // 输出文件内容
  console.log(data);
}

// -- 异步读取文件
fs.readFile(filePath, "utf8", showData);
```

#### JS 函数可以作为另一个函数的返回值

函数作为返回值传递，基本上都是馋人家闭包的特性。比如下面这个例子：

```js
//先把这个已经确定的加数（a）以【闭包中的自由变量】的形式存起来，然后返回一个待执行的加法函数。等什么时候第二个加数也确定了，就可以立刻执行这段逻辑。

function baseAdd(a) {
  return (b) => {
    return a + b;
  };
}

const addWithOne = baseAdd(1);

// .... (也许在许多行业务逻辑执行完毕后）

const result = addWithOne(2);
```

### 一等公民的本质：JS 函数是可执行的对象

JS 函数的类型是 Function，它具备 Function 原型上的一切属性和方法，而 Function 和 Array、Date 这些 built-in Class 一样，都属于对象类型。

- 既然函数也是对象，那么对象能干的事，函数也能干。对象能干啥？别的不说，咱对照“一等公民”的特征来看一下：
  - 能不能赋值给变量？能！
  - 能不能作为函数参数传递？能！
  - 能不能作为返回值返回？能！

```js
const func = () => {};
func instanceof Function; //true
typeof func; //"function"
func.__proto__ === Function.prototype; //true;
```

### "一等公民" 的现实意义

这意味着函数在 JS 世界中，具有最高的自由度。这"最高的自由度"，是从能力的角度来说的，它意味着函数是 JS 世界里技能树最满的家伙，别人能干的活，它能干，别人干不了的活，它还能干。这直接决定了函数可以在 JS 世界里横着走，可以帮我们做任何我们想要做的事情，这也使“以函数为基本单位构建应用程序”成为可能。

由此我们可以断言，任何语言如果想要实现对函数式编程范式的支持，就必须支持“函数是一等公民”这一特性。
