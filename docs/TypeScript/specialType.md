---
title: TS 特有的数据类型
author: 向阳
date: 2023-05-10
---

## TS 特有的数据类型

### any 类型

- 应用场景：

  - 在某些情况下，我们确实无法确定一个变量的类型，并且可能它会发生一些变化（类似于 Dart 语言中的 dynamic 类型）
  - 当进行一些类型断言 as any（有一些类型断言不能直接通过 as 进行转化，这个时候先把对应的东西转成 any 类型，再转成其他类型就不会报错了）
  - 如果对于某些情况的处理过于繁琐不希望添加规定的类型注解，或者在引入一些第三方库时，缺失了类型注解： 包括在 Vue 源码中，也会使用到 any 来进行某些类型的适配；
  - 在不想给某些 JavaScript 添加具体的数据类型时(用 any 相当于和原生的 JavaScript 代码是一样，好的一点是，从 JS 慢慢过渡到 TS,在一些地方可以先用 any,再在重构的时候再一点点进行转化)

- any 类型有点像一种讨巧的 TypeScript 手段：

```ts
//1.我们可以对any类型的变量进行任何的操作，包括获取不存在的属性、方法；（从TS的类型检测角度，这种代码是不安全的）
let message: any = "Hello World";

message = 123;
message = true;
message = {};
// message()
// message.split(" ")

//2.不推荐，数组里面最好放确定的统一的数据类型
const arr: any[] = [];
```

### unknown 类型

- unknown 是 TypeScript 中比较特殊的一种类型，它用于描述类型不确定的变量。
- 和 any 的区别：
  - unknown 类型只能赋值给 any 和 unknown 类型,防止你拿到一个不确定类型后，到其他地方乱用；（3.x 出现的）
  - any 类型可以赋值给任意类型，有安全隐患；

```ts
function foo() {
  return "abc";
}
function bar() {
  return 123;
}

let flag = true;
let result: unknown; // 最好不要使用any
if (flag) {
  result = foo();
} else {
  result = bar();
}
// 如果上方是用any，这里就不会报错。如果是unknown，只能赋值给any和unknown类型，这里赋值给了string和number类型，就会报错
let message: string = result;
let num: number = result;

console.log(result);
```

### void 类型

- 定义：`void通常用来指定一个函数是没有返回值的`，那么它的返回值就是 void 类型
- 写法：

```ts
//写法1:我们没有对函数写任何类型，那么它默认返回值的类型就是 void 的（类型推断）
function sum(num1: number, num2: number) {
  console.log(num1 + num2);
}

//写法2:我们也可以显示的来指定返回值是 void，一般不写
function sum1(num1: number, num2: number): void {
  console.log(num1 + num2);
}
sum(20, 30);
```

- 补充：在 JS 中函数如果没有返回值，其实相当于默认 return undefined。所以当返回值是 void 时，我们可以将 null 和 undefined 赋值给 void 类型，也就是函数可以返回 null 或者 undefined

```ts
function sum3(num1: number, number2) {
  console.log(num1 + num2);
  //return null;
  return undefined;
}
```

### never 类型

- never 表示永远不会发生值的类型(永远不会被赋值)。
- 举例：比如一个函数中是一个死循环或者抛出一个异常，那么这个函数会返回东西吗？不会，那么写 void 类型或者其他类型作为返回值类型都不合适，我们就可以使用 never 类型；

```ts
function foo(): never {
  // 死循环
  while (true) {}
}

function bar(): never {
  //抛出异常
  throw new Error();
}
```

- 应用场景 1：编写核心库

```ts
/*思路：*/
//1.封装了一个简陋的核心函数，如果函数调用传入的是字符串和数字类型，就会正常执行相应的代码。
//但是当传入的参数是其他的类型时，编辑器会报错。
//于是开发者就会在函数的联合类型里新添其他类型，但是可能会忘记写相应类型的处理逻辑，因为这时候能正常运行不会报错。
function handleMessage(message: string | number) {
  //联合类型
  switch (typeof message) {
    case "string":
      console.log("string处理方式处理message");
      break;
    case "number":
      console.log("number处理方式处理message");
      break;
  }
}
handleMessage("abc");
handleMessage(123);
handleMessage(true);

//2.思考怎么在联合类型中增加了其他类型后，又不会漏掉对那个类型做处理的相应代码？
//在swicth末尾添上default,并且给一个never类型的变量赋值。
//因为上述情况，会来到default，而check又是never类型(永远不可能有赋值过程)，就会报错。
*/
function handleMessage(message: string | number | boolean) {
  //联合类型
  switch (typeof message) {
    case "string":
      console.log("string处理方式处理message");
      break;
    case "number":
      console.log("number处理方式处理message");
      break;
    default:
      const check: never = message;
  }
}

handleMessage("abc");
handleMessage(123);

// 张三
handleMessage(true);
```

- 应用场景 2：和应用场景 1 其实是一个意思，只是官方写的复杂一点，后续可以补充

```ts
//TODO补充，目前牵扯到很多还没学的知识。如interface
```

### tuple 类型

- tuple 是元组类型，很多语言中也有这种数据类型，比如 Python、Swift 等。
- 那么 tuple 和数组有什么区别呢？
  1. 首先，数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中。（可以放在对象或者元组中）
  2. 其次，元组中每个元素都有自己特性的类型，根据索引值获取到的值可以确定对应的类型；

```ts
// 1.数组的弊端
/*
 * a.取info[0]时，鼠标放上去显示的是any类型，因为数组里面都是any,那从数组里面取出的元素当然是any。
 * b.这种写法从数组取出某一元素，都是any类型，不能确定类型，用的时候其实是很不安全的:比如对info[0].length处理时,
 * 假如说它实际的值是undefined，这样调就会在编译时直接报错了。
 */
const info1: any[] = ["why", 18, 1.88, undefined];
console.log(info1[0].length);
console.log(info1[3].length);

//2.存放在对象中，有时候会有点冗余，没有数组看起来简洁
// const infoObj = {
//   name: "why",
//   age: 18,
//   height: 1.88
// }

// 3.元组的特点：就想用数组的形式保存，又想知道其中每个元素的类型（类型不符合时，编辑器首先就会报错）
const info: [string, number, number] = ["why", 18, 1.88];
const name = info[0];
console.log(name.length);
// const age = info[1]
// console.log(age.length)
```
