---
title: 类目：css
author: 向阳
date: 2023-06-07
---

### 1.用 flex 布局解决的常见几种需求

场景 1:一个盒子中的 4 个子元素完全平分一行，即不会受子元素内容大小影响（flex:1 会受内容大小影响会变得大小不一），且需要有间隔。

<!-- <img src="./imgs/flex布局2.jpg"> -->

- 方式 1:通过给每个子元素精确计算的方式，适用于换行/不换行。

:::demo

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .parent {
        width: 60%;
        background-color: black;
        display: flex;
      }
      .child {
        margin: 0 5px 5px 0;
        min-width: calc((100% - 15px) / 4);
        max-width: calc((100% - 15px) / 4);
        width: calc((100% - 15px) / 4);
        height: 50px;
        background-color: pink;
      }
      .child:nth-child(4n) {
        margin-right: 0;
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="child">舒服的沙发</div>
      <div class="child">舒服的沙发舒服的沙发</div>
      <div class="child">舒服的沙发舒服的沙发</div>
      <div class="child">舒服的沙发舒服的沙发</div>
    </div>
  </body>
</html>
```

:::

- 方法 2:这种方式比较取巧，因为是给最外层盒子设的背景色，而给子元素的直接父元素设置 flex 布局，以及取减去子元素的 margin-right 值的宽度，为了精确获得子元素的 flex-basis，而 flex 又默认不换行，所以视觉效果上就达成了目标。但这种方式不适合换行，实际父元素撑满不了 4 个，所以 3 个就换行了。

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
        width: 60%;
        background-color: black;
      }
      .parent {
        height: 150px;
        display: flex;
        width: calc(100% - 48px);
      }

      .child {
        background-color: pink;
        flex: 0 0 25%;
        height: 50px;
        margin-right: 16px;
      }
      .child:last-of-type {
        margin-right: 0;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="parent">
        <div class="child">舒服的沙发</div>
        <div class="child">舒服的沙发舒服的沙发</div>
        <div class="child">舒服的沙发舒服的沙发</div>
        <div class="child">舒服的沙发舒服的沙发</div>
      </div>
    </div>
  </body>
</html>
```

场景 2:一个盒子内部，子元素可以换行，但每一行平分 4 个，有间隔。

<!-- <img src="./imgs/flex布局1.jpg"> -->

:::demo

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .parent {
        width: 60%;
        background-color: black;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
      .child {
        margin: 0 5px 5px 0;
        min-width: calc((100% - 15px) / 4);
        max-width: calc((100% - 15px) / 4);
        width: calc((100% - 15px) / 4);
        height: 50px;
        background-color: pink;
      }
      .child:nth-child(4n) {
        margin-right: 0;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="parent">
        <div class="child">舒服的沙发</div>
        <div class="child">舒服的沙发舒服的沙发</div>
        <div class="child">舒服的沙发舒服的沙发</div>
        <div class="child">舒服的沙发舒服的沙发</div>
        <div class="child">舒服的沙发</div>
        <div class="child">舒服的沙发舒服的沙发</div>
        <div class="child">舒服的沙发舒服的沙发</div>
        <div class="child">舒服的沙发舒服的沙发</div>
      </div>
    </div>
  </body>
</html>
```

:::

### 2.纯 css 制作表格

场景 1:想让 table 固定表格宽度，设置列宽，不换行，超出宽度显示...

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .fixed-table {
        width: 300px;
        table-layout: fixed;
      }
      .fixed-table th,
      .fixed-table td {
        width: 150px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 11px 10px;
      }
      th {
        background: rgba(18, 66, 125, 0.8);
      }
      td {
        background: #ccc;
      }
    </style>
  </head>
  <body>
    <table
      class="fixed-table"
      border="0"
      cellpadding="0"
      cellspacing="0"
      style="border-collapse: collapse"
    >
      <tr>
        <th>姓名</th>
        <th>年龄</th>
      </tr>
      <tr>
        <td>小王子小王子小王子小王子小王子小王子</td>
        <td>12</td>
      </tr>
    </table>
  </body>
</html>
```

场景 2:想让 table 横向滚动条：table 外定个宽，table 内容超出就会出现滚动条，再设置滚动条样式，如下为 chrome 的滚动条样式修改

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .table-wrap {
        width: 300px;
        overflow-x: auto;
      }
      ::-webkit-scrollbar {
        /** 滚动条宽 **/
        width: 6px;
        height: 13px;
      }
      ::-webkit-scrollbar-thumb {
        /**滚动条 拖动条 **/
        background-color: #1a68c2;
        border-radius: 0;
      }
      ::-webkit-scrollbar-track {
        /** 滚动条背景槽 **/
        background-color: rgba(36, 61, 102, 1);
        border-radius: 0;
      }
      th,
      td {
        white-space: nowrap;
        padding: 11px 10px;
      }
      th {
        background: rgba(18, 66, 125, 0.8);
      }
      td {
        background: #ccc;
      }
    </style>
  </head>
  <body>
    <div class="table-wrap">
      <table cellspacing="0" border="0" cellpadding="0">
        <tr>
          <th>姓名</th>
          <th>年龄</th>
        </tr>
        <tr>
          <td>小王子小王子小王子小王子小王子小王子</td>
          <td>12</td>
        </tr>
      </table>
    </div>
  </body>
</html>
```
