---
title: npx use
author: 向阳
date: 2023-03-30
---

[借鉴](https://www.cnblogs.com/hongzhiguo/p/14592093.html)

## npx 的使用

### npx 的工作原理

- npm 在 5.2 版本之后添加了 npx 命令

1. 去 node_modules/.bin 目录查找命令是否存在。找到之后执行
2. 如果在 bin 目录下找不到命令，那么就会去$path 里查找命令，找到后执行
3. 如果都找不到，那么就会创建一个临时的文件下载所需要的的依赖包，使用完成后删除，不污染全局环境

### 安装 npx

- 先检查一下自己的电脑上是否有 npx(直接使用 npx 命令也会自动全局安装)。
- 如果没有， 打开 cmd 全局安装 npx

```bash
npm install -g npx
```

### 使用 npx

- --no-install 参数和--ignore-existing 参数

  - 如果想强制 npx 使用本地依赖不下载远程依赖。就是用--no-install,如果本地没有依赖包的话，就会报错

  ```bash
  $ npx --no-install http-server
  ```

  - 相反，想跳过本地依赖使用远程安装就是用参数--ignore-existing.

  ```bash
  $ npx --ignore-existing create-react-app packageName
  ```
