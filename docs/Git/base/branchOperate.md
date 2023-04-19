---
title: 分支操作
author: 向阳
date: 2023-03-27
---

## 分支操作

### 新建分支

```bash
$ git checkout -b iss53
Switched to a new branch "iss53"

# 它是下面两条命令的简写：
# 创建分支
$ git branch iss53
# 切换分支
$ git checkout iss53
```

### 删除分支

```bash
$ git branch -d hotfix
Deleted branch hotfix (3a0874c).
```

### 分支合并

```bash
# 切换到想要合并入的分支
git  branch master
# 合并其他分支代码
git merge issue53
```

### 远程分支

远程引用的显示列表

```bash
git ls-remote <remote>
```

获得远程分支的更多信息

```bash
git remote show <remote>
```

#### 推送

#### 拉取

#### (1) 删除远程分支

基本上这个命令做的只是从服务器上移除这个指针。 Git 服务器通常会保留数据一段时间直到垃圾回收运行，所以如果不小心删除掉了，通常是很容易恢复的。

```bash
# 如果想要从服务器上删除 serverfix 分支
$ git push origin --delete serverfix
To https://github.com/schacon/simplegit
 - [deleted]         serverfix
```
