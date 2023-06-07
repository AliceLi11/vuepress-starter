---
title: npm command
author: 向阳
date: 2023-03-30
---

- npm 查看已安装的包(全局、和本地)[借鉴文档](https://blog.csdn.net/qq_41664096/article/details/121797260)

```bash
# 查看全局已安装,会把包的所有依赖也显示出来（-g 的意思是 global 全局的意思）
$ npm ls -g

# 加上层级控制显示深度：--depth 0。这样就只会查到安装的包，并不会查到包的依赖。
$ npm ls -g --depth 0

# 查看当前项目已安装包（项目跟目录必须有 package.json 文件）
$ npm ls --depth 0

# 如果只想显示生产环境依赖的包
$ npm ls --depth 0 --prod

# 只显示开发环境依赖的包
$ npm ls --depth 0 --dev


```

- 安装/卸载依赖

```bash
$ npm install express --save

#这个命令会把它从node_modules/中删除，还会更新package.json文件
$ npm rm express --save
```
