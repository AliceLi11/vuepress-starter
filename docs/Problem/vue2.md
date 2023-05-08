---
title: 类目：vue2.js
author: 向阳
date: 2023-05-08
---

### 1.keep-alive 做缓存：

场景：页面 A、页面 B、页面 A 的详情页，给页面 A 动态设置缓存：只有从详情页 至 页面 A 时，页面 A 才需做缓存。

实现：利用 keep-alvie 的 include 属性，就是把要缓存的组件写成一个数组放到里面，也可以用字符串的形式。但要注意在组件内写上 name，不能是匿名组件，否则不会生效。

> include - 以用逗号分隔字符串、正则表达式或一个数组来表示。只有名称匹配的组件会被缓存。<br>
> exclude - 以用逗号分隔字符串、正则表达式或一个数组来表示。任何名称匹配的组件都不会被缓存。<br>
> 匹配规则：匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。

```vue
<template>
  <!-- 缓存 -->
  <keep-alive :include="keepList">
    <router-view />
  </keep-alive>
</template>
<script>
export default {
  name: "Layout",
  data() {
    return {
      keepList: ["A"],
    };
  },
  watch: {
    $route(newVal) {
      if (newVal) {
        this.keepList =
          newVal.name === "A" || newVal.name === "DetailA" ? ["A"] : [];
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
```

页面 A

```vue
<template>页面 A</template>
<script>
export default {
  name: "A",
  data() {
    return {};
  },
};
</script>
```

页面 B

```vue
<template>页面 B</template>
<script>
export default {
  name: "B",
  data() {
    return {};
  },
};
</script>
```

页面 A 的详情页

```vue
<template>页面 A 的详情页</template>
<script>
export default {
  name: "DetailA",
  data() {
    return {};
  },
};
</script>
```
