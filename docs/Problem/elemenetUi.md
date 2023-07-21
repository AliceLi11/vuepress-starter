---
title: 类目：ElementUI
author: 向阳
date: 2023-03-27
---

### 1.文件上传

场景：单选/多选、上传限制、立即上传/后期上传

### 2.DatePicker 日期选择器设置禁用日期

场景 1：如动态禁用日期为后端返回的 2023-06-25 作为最大选择期限

:::demo

```html
<template>
  <el-date-picker
    v-model="value1"
    type="date"
    placeholder="选择日期"
    :pickerOptions="pickerOptions"
  >
  </el-date-picker>
</template>

<script>
  export default {
    data() {
      return {
        value1: "",
        maxLimitDate: "2023-06-25",
      };
    },
    computed: {
      pickerOptions() {
        let that = this;
        return {
          disabledDate(time) {
            let limitDate = new Date(that.maxLimitDate).getTime();
            return time.getTime() > limitDate;
          },
        };
      },
    },
  };
</script>
```

:::

场景 2：只能选择今天之后的日期（不包含今天）
:::demo

```html
<template>
  <el-date-picker
    v-model="value1"
    type="date"
    placeholder="选择日期"
    :pickerOptions="pickerOptions"
  >
  </el-date-picker>
</template>

<script>
  export default {
    data() {
      return {
        value1: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },
      };
    },
  };
</script>
```

:::

场景 3：只能选择今天以及今天之后的日期

- setDate(day) 方法用于设置一个月的某一天,day 表示一个月中的一天的一个数值（1 ～ 31，0 为上个月的最后一天，-1 位上一个月最后一天之前的一天，如果当月有 31 天 32 为下个月的第一天）。

:::demo

```html
<template>
  <el-date-picker
    v-model="value1"
    type="date"
    placeholder="选择日期"
    :pickerOptions="pickerOptions"
  >
  </el-date-picker>
</template>

<script>
  export default {
    data() {
      return {
        value1: "",
        pickerOptions: {
          disabledDate(time) {
            // 方式1:如果没有后面的-8.64e7就是不可以选择今天的
            // return time.getTime() < Date.now() - 8.64e7;

            //方式2:date打印为Thu Jun 29 2023 17:02:21 GMT+0800 (中国标准时间)这样的字符串，date.getTime()转换为时间戳
            let date = new Date();
            date.setDate(date.getDate() - 1);
            return time.getTime() < date.getTime();
          },
        },
      };
    },
  };
</script>
```

:::

场景 4：只能选择今天以及今天之前的日期

:::demo

```html
<template>
  <el-date-picker
    v-model="value1"
    type="date"
    placeholder="选择日期"
    :pickerOptions="pickerOptions"
  >
  </el-date-picker>
</template>

<script>
  export default {
    data() {
      return {
        value1: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      };
    },
  };
</script>
```

:::

### 3.Table 动态根据表头文字的多少设置宽度，即不换行

- 思路：利用表头部重新渲染的方法：获得文字所需的宽度，然后赋值给 column 的 width
- 效果展示：日期设置了方法，姓名没有设置方法
- 注意：不能通过给标题设置不还行`white-space: nowrap;`的样式，会导致标题和内容的边框不对齐

:::demo

```html
<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column
      prop="date"
      label="日期日期日期日期日期日期日期日期日期日期日期日期"
      :render-header="renderHeader"
    >
    </el-table-column>
    <el-table-column prop="name" label="姓名姓名姓名姓名姓名姓名姓名">
    </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
    methods: {
      // 表头部重新渲染:获得文字所需的宽度，然后赋值给column的minWidth
      renderHeader(h, { column, $index }) {
        // 新建一个 span
        let span = document.createElement("span");
        // 设置表头名称
        span.innerText = column.label;
        // 临时插入 document
        document.body.appendChild(span);
        // 重点：获取 span 最小宽度，设置当前列，注意这里加了 40，字段较多时还是有挤压，且渲染后的 div 内左右 padding 都是 10，所以 +20 。（可能还有边距/边框等值，需要根据实际情况加上）
        column.width = span.getBoundingClientRect().width + 40;
        // 移除 document 中临时的 span
        document.body.removeChild(span);
        return h("span", column.label);
      },
    },
  };
</script>
```

:::

### 4.Form 表单校验的方式

场景 1：需要调接口，如输入框失焦后及时反馈该输入值是否已存在

场景 2：正则/自定义校验中运用正则

:::demo

```vue
<template>
  <el-form :model="formModel" :rules="rules" label-width="100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="formModel.name"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="formModel.phone"></el-input>
    </el-form-item>
    <el-form-item label="非中文" prop="column">
      <el-input v-model="formModel.column"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      formModel: {
        name: "",
        phone: "",
      },
      rules: {
        name: [
          { required: true, trigger: "blur", message: "请输入" },
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              const res = require("./validator.json");
              if (!res.data) {
                callback(new Error("角色名已存在！"));
              } else {
                callback();
              }
              //   obj.$http
              //     .roleNameExist({
              //       roleName: obj.roleDialogForm.roleName,
              //       roleCode: obj.roleDialogForm.roleCode,
              //     })
              //     .then((res) => {
              //       if (!res.data) {
              //         callback(new Error("角色名已存在!"));
              //       } else {
              //         callback();
              //       }
              //     });
              //   fetch("http://localhost:8083/reportBloodData.json");
              //     .then((res) => res.json())
              //     .then((data) => {
              //       G6.Util.traverseTree(data, function (item) {
              //         item.id = item.tableNameEn;
              //       });
              //       this.G6Params.data = data;
              //     });
              // },
            },
          },
        ],
        phone: [
          { required: true, trigger: "blur", message: "请输入" },
          {
            required: true,
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        column: [
          { required: true, trigger: "blur", message: "请输入" },
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (/[\u4E00-\u9FA5]/g.test(value)) {
                callback(
                  new Error("请不要输入中文汉字，可以是英文、数字、特殊符号!")
                );
              } else {
                callback();
              }
            },
          },
        ],
      },
    };
  },
};
</script>
```

:::

### 5.el-cascader

场景 ：一级单选，二级多选。即选择了一级后，其他一级（以及一级的 children）都为 disabled
:::demo

```vue
<div class="block">
  <span class="demonstration">折叠展示Tag</span>
  <el-cascader
    :options="options"
    :props="props"
    collapse-tags
     @change="handleCascaderChange"
    clearable></el-cascader>
</div>

<script>
export default {
  data() {
    return {
      props: { multiple: true },
      options: [
        {
          value: 1,
          label: "东南",
          disabled: false,
          children: [
            { value: 3, label: "普陀", disabled: false },
            { value: 4, label: "黄埔", disabled: false },
            { value: 5, label: "徐汇", disabled: false },
          ],
        },
        {
          value: 17,
          label: "西北",
          disabled: false,
          children: [
            { value: 22, label: "乌鲁木齐", disabled: false },
            { value: 23, label: "克拉玛依", disabled: false },
          ],
        },
      ],
      disabledOptions: [],
    };
  },
  methods: {
    handleCascaderChange(value) {
      let firstLevel, secondLevel;
      if (Array.isArray(value) && value.length) {
        [firstLevel, secondLevel] = value[0];
      }
      if (firstLevel) {
        this.disabledOptions = this.options.filter(
          (item) => item.value !== firstLevel
        );
        this.disabledOptions.forEach((option) => {
          option.disabled = true;
          if (Array.isArray(option.children)) {
            option.children.forEach((child) => {
              child.disabled = true;
            });
          }
        });
      } else {
        this.disabledOptions.forEach((option) => {
          option.disabled = false;
          if (Array.isArray(option.children)) {
            option.children.forEach((child) => {
              child.disabled = false;
            });
          }
        });
      }
    },
  },
};
</script>
```

:::
