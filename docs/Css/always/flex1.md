---
title: 常用记录
author: 向阳
date: 2023-03-27
---

## flex:1 由哪几个属性组成

[阮一峰文档](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

#### 首先我们来看项目的几个属性：flex-grow、flex-shrink、flex-basis

- `flex-grow:<number>`:定义项目的放大比例。默认为 0，即如果存在剩余空间，也不放大。
- `flex-shrink:<number>`:定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。如果某项目为 0，即在空间不足时，该项目也不缩小。
- `flex-basis:<length>|auto`;定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。默认值为 auto，即项目的本来大小（由项目本身内容决定）。也可以设为和 width/height 属性一样的值（如 350px、50%）。

#### 接下去我们来看 flex 这个属性：flex 属性是 flex-grow、flex-shrink、flex-basis 的缩写。默认值是 0 1 auto。

- 该属性有几个快捷键：

  - flex:auto（1 1 auto）
  - flex:none（0 0 auto）
  - felx:1（1 1 0%）

#### flex:1 为什么是 1 1 0%

- 子项目的 flex-basis 和 width 同时存在时:
  - 如果 flex-basis 为 auto，那么元素就会参照 width。
  - 如果 flex-basis 不为 auto（如：0，200px 等），那么元素就会忽略 width（即使你设置了 width）。
- 所以当 flex-basis 为 0%时，保证项目在分配多余空间前所占据的主轴空间为 0%。flex-shrink 和 flex-grow 也都为 1，所以最后保证了这几个项目等分的效果。

#### 最后看示例：

- 示例一：在子项目同时设有 width 和 flex-basis 不为 auto 时，flex-basis 优先级比 width 高，即 width 被忽视。
  - 以下案例：在 flex:1 时，3 个子 div 宽度等分；在 flex:auto 时，子项目在保持 width 时，平分剩余宽度（如果总宽度大于外盒宽度，等比例缩小）。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 600px;
        height: 100px;
        display: flex;
      }
      .box div {
        background: green;
        flex: 1;
        /* flex:auto; */
        margin: 10px;
      }
      .box div:nth-child(1) {
        width: 100px;
      }
      .box div:nth-child(2) {
        width: 200px;
      }
      .box div:nth-child(3) {
        width: 200px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div>
        haskdhsjkagf家啊开始疯狂借古讽今卡颂古非今可是大部分进步三等奖方便撒办法撒把房间卡办法
      </div>
      <div>2</div>
      <div>3</div>
    </div>
  </body>
</html>
```

- 示例二：flex-grow 和 flex-shrink 不为 1 时，子项目按各自属性的数值比例放大或缩小。1x+3x+1x = (500-300) => 5x=200 => x=40。所以最后 3 个 div 分别为 140、220、140。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 500px;
        height: 100px;
        display: flex;
      }

      .box div {
        background-color: hotpink;
        width: 100px;
      }

      .box div:nth-child(1) {
        flex-grow: 1;
      }

      .box div:nth-child(2) {
        flex-grow: 3;
        background-color: green;
      }
      .box div:nth-child(3) {
        flex-grow: 1;
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  </body>
</html>
```
