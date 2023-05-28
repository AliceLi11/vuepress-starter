---
title: 类目：记录 ToolUN 合作开发过程
author: 向阳
date: 2023-05-08
---

## 问题记录

[解决：Expected linebreaks to be ‘LF‘ but found ‘CRLF‘.eslintlinebreak-style）](https://blog.csdn.net/chen__cheng/article/details/118304013)

- 原因：不同系统不同工具下换行符的问题(windows-CRLF，unix-LF)
- 解决：
  - 如果使用的是 vscode，直接更改底部右侧 LF 为 CRLF 。
  - 在 eslint 配置文件.eslintrc.js 中添加 linebreak-style 规则，声明为 unix 系统即可：
