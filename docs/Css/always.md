<!--
 * @Descripttion:
 * @Author: suanmei
 * @Date: 2023-03-27 10:14:10
 * @LastEditors: suanmei
 * @LastEditTime: 2023-06-07 17:37:31
-->

---

title: 常用记录
author: 向阳
date: 2023-03-27

---

## flex:1 由哪几个属性组成

[阮一峰文档](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[阮一峰文档 2](https://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

[外链](https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649125863&idx=2&sn=01073e195d282f5830c2ad41a428876f&chksm=be58544a892fdd5c54106e6516db839481a3a61e8810827f6e8f5d70d039252e474a588131e9&scene=27)、

- 首先我们来看项目的几个属性：flex-grow、flex-shrink、flex-basis

  - `flex-grow:<number>`:定义项目的放大比例。默认为 0，即如果存在剩余空间，也不放大。
  - `flex-shrink:<number>`:定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。如果某项目为 0，即在空间不足时，该项目也不缩小。
  - `flex-basis:<length>|auto`;定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。默认值为 auto，即项目的本来大小（由项目本身内容决定）。也可以设为和 width/height 属性一样的值（如 350px、50%）。

- 接下去我们来看 flex 这个属性：flex 属性是 flex-grow、flex-shrink、flex-basis 的缩写。默认值是 0 1 auto。

  - 该属性有几个快捷键：
    - flex:auto（1 1 auto）
    - flex:none（0 0 auto）
    - felx:1（1 1 0%）

- flex:1 为什么是 1 1 0%
  - flex-basis 和 width 同时存在时，flex-basis 比 width 优先级更高。
    - 如果 flex-basis 为 auto，那么元素就会参照 width，
    - 如果 flex-basis 不为 auto（如：0，200px 等），那么元素就会忽略 width（即使你设置了 width），当 flex-basis 为 0%时，保证项目在分配多余空间前所占据的主轴空间为 0%。flex-shrink 和 flex-grow 也都为 1，所以最后保证了这几个项目等分的效果。

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
        width: 500px;
        height: 100px;
        display: flex;
      }
      .box div {
        background: green;
        flex: 1;
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
