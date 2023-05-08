---
title: git tag
author: 向阳
date: 2023-04-28
---

## 概述

**意义**

标签总是跟某个 commit 绑在一起，可以给仓库历史中的某一个提交打上标签，以示重要。后续可以利用打下的标签名提取对应的历史版本。比较有代表性的是人们会使用这个功能来标记发布结点（ v1.0 、 v2.0 等等）。

**标签类型**

Git 支持两种标签：轻量标签（lightweight）与附注标签（annotated）

- 轻量标签（lightweight）:它只是某个特定提交的引用。（打下的标签存储在.git/refs/tags 中，查看打下的标签名文件，内部是一个 固定的 SHA-1 值指向提交对象）
- 附注标签（annotated）:存储在 Git 数据库中的一个完整对象， 它们是可以被校验的，其中包含打标签者的名字、电子邮件地址、日期时间， 此外还有一个标签信息，并且可以使用 GNU Privacy Guard （GPG）签名并验证。（TODO:摘抄自官网，后续还要换成自己理解的）
- 建议创建附注标签，这样你可以拥有以上所有信息。但是如果你只是想用一个临时的标签， 或者因为某些原因不想要保存这些信息，那么也可以用轻量标签。

**tag 命名**

一般遵循 GitHub 语义化版本命名规范（Semantic Versioning）：主版本号.次版本号.修订号

- 主版本号：当做了不兼容的 API 修改
- 次版本号：当做了向下兼容的功能性新增
- 修订号：当做了向下兼容的问题修正

**应用 tag 方式**

可以使用以下几种方式来应用 tag：

- 采用 git-flow、gitlab-flow 这类模型来做版本控制，它们的版本控制也是基于 tag，有很多辅助工具，如扩展集 git-flow-avh，可视化工具 Sourcetree 和 Git Tower 也内置 git-flow，都能帮我们自动完成打 tag 的工作。
- 如果有自动化部署工具，就可以在合并至线上分支后时加入自动打 tag 的命令。
- 当然也可以选择自己来打 tag，依个人喜好借助可视化工具或者直接使用命令行。

## 使用

### 1. 创建标签

```shell
# 创建轻量标签
git tag <tagname>

# 创建附注标签(-m 选项指定了一条将会存储在标签中的信息。如果没有指定，Git会启动编辑器要求你输入信息，像git commit没指定时一样)
git tag -a <tagname> -m "附注信息"

# 对过去的提交打标签:你需要在命令的末尾指定提交的校验和（或部分校验和）
git tag -a <tagname> 9fceb02
```

### 2. 展示标签

```shell
# 列出已有的标签(以字母顺序列出标签)
git tag
git tag -l
git tag --list

# 列出筛选过的标签，如以v1.0开头的所有tag(-l/--list必须有)
git tag -l "v1.0*"

# 查看标签信息和与之对应的提交信息
git show <tag_name>
```

- 通过使用 git show 命令查看附注标签（可以看到标签信息和与之对应的提交信息）

```shell
# 输出显示了打标签者的信息、打标签的日期时间、附注信息，然后显示具体的提交信息。
$ git show v1.0.1
tag v1.0.1
Tagger: suanmei <suanmei@yscredit.com>
Date:   Fri Apr 28 15:19:16 2023 +0800

我是测试在gitcommit提交信息后，打附注标签时指定的信息

commit f1081398e40680402308acf2c800602e0cebe18c
Author: suanmei <suanmei@yscredit.com>
Date:   Fri Apr 28 14:36:31 2023 +0800

    我是测试gitcommit的时候提交的信息
```

- 通过使用 git show 命令查看轻量标签（只会显示出提交信息，不会看到额外的标签信息）

```shell
$ git show v1.0
commit f1081398e40680402308acf2c800602e0cebe18c
Author: suanmei <suanmei@yscredit.com>
Date:   Fri Apr 28 14:36:31 2023 +0800

    我是测试gitcommit的时候提交的信息
```

### 3. 推送标签

默认情况下，git push 命令并不会传送标签到远程仓库服务器上。 在创建完标签后你必须显式地推送标签到共享服务器上。

```shell
# 一次性推送一个标签
git push <remote> <tagname>

# 一次性推送所有不在远程仓库服务器上的标签(不区分轻量标签和附注标签)
git push <remote> --tags
```

### 4. 删除标签

删除本地仓库标签

```shell
git tag -d <tagname>
```

删除远程标签

```shell
# 方式1:将冒号前面的空值推送到远程标签名，从而高效地删除它。
git push <remote> :refs/tags/<tagname>

# 方式2:更直观的删除远程标签的方式
git push <remote> --delete <tagname>
```

### 5. 检出标签

需要注意的副作用：当本地代码切至某个标签后，会使你的仓库处于“分离头指针”（detached HEAD）状态。如果有新提交，新提交将不属于任何分支且无法访问（除非通过 确切的提交哈希），标签也不会发生变化。

```shell
# 可以查看某个标签所指向的文件版本
git checkout <tagname>
```

如果需要基于标签进行更改，通常需要创建一个新分支。但如果在这之后又进行了一次提交，新分支就会因为这个改动向前移动， 此时它就会和 基于的标签稍微有些不同，这时就要当心了。

```shell
# <tagname>为基于的标签名
git checkout -b <branch> <tagname>
```

### 标签对象

git 有 4 种主要的对象类型：数据对象、树对象、提交对象、标签对象。标签对象非常类似于一个提交对象————它包含一个标签创建者信息、一个日期、一段注释信息，以及一个指针。主要的区别在于，标签对象通常指向一个提交对象，而不是一个树对象。 **它像是一个永不移动的分支引用——永远指向同一个提交对象，只不过给这个提交对象加上一个更友好的名字罢了**。（TODO:摘抄自官网，后续还要换成自己理解的）

**查看轻量标签内容**

保存的是一个固定的引用直接指向提交对象：

```shell
# git commit内容后，创建一个轻量标签
$ git tag v1.0.2qingliang

# 进入.git/refs/tags查看文件内容，得到的是一个固定的引用直接指向提交对象（这里得出的结果会不同，可查阅SHA-1检验和计算）
$ cat v1.0.2qingliang
f1081398e40680402308acf2c800602e0cebe18c

# 通过这个索引查看存储在对象数据库中的文件内容（提交对象）
$ git cat-file -p f1081398e40680402308acf2c800602e0cebe18c
tree 73200e36a4f61064e35ed532e8580182d282cd74
author suanmei <suanmei@yscredit.com> 1682663791 +0800
committer suanmei <suanmei@yscredit.com> 1682663791 +0800

1

# 通过73200e36a4f61064e35ed532e8580182d282cd74索引查看存储在对象数据库中的文件内容
$ git cat-file -p 73200e36a4f61064e35ed532e8580182d282cd74
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391    1.js
```

**查看附注标签内容**

包含标签信息，其中 object 条目指向我们打了标签的那个提交对象的 SHA-1 值

```shell
# 创建一个附注标签
git tag -a v1.0.3fuzhu -m "fuzhu"

# 进入.git/refs/tags目录查看文件内容
$ cat v1.0.3fuzhu
eeb9b372037dafb1ee3decb0a186f9beaccddefa

# 通过这个索引查看存储在对象数据库中的文件内容，其中object 条目指向我们打了标签的那个提交对象的 SHA-1 值。
# 注意：标签对象并非必须指向某个提交对象；你可以对任意类型的 Git 对象打标签。 例如，在 Git 源码中，项目维护者将他们的 GPG 公钥添加为一个数据对象，然后对这个对象打了一个标签。
$ git cat-file -p eeb9b372037dafb1ee3decb0a186f9beaccddefa
object f1081398e40680402308acf2c800602e0cebe18c
type commit
tag v1.0.3fuzhu
tagger suanmei <suanmei@yscredit.com> 1682781020 +0800

fuzhu
```

### 常用选项

可查阅 [Git-Basics-Tagging](https://git-scm.com/docs/git-tag)、[git-tag](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)，或使用 git tag --help 命令。

- `-a`、`--annotate`:创建一个未签名、带注释的标记对象。
- `-l`、`--list`：列出标签。
- `-i`、`--ignore-case`：排序和过滤标签时不区分大小写。
- `-m <msg>`、`--message=<msg>`：设置标签信息，如果存在多个-m 选项，它们将作为单独的段落连接起来。
- `-d`、`--delete`：删除指定标签。
- `-f`、`--force`：使用指定名称替换现有标签。
- `-F <file>`、`--file=<file>`：从指定文件中获取标签消息。
- `-n<num>`：指定使用-l 时打印多少行。
- `--sort=<key>`：根据关键字排序。
- `--contains <commit>`：只列出包含指定提交的标签（如果未指定，则为 HEAD）。
- `--no-contains <commit>`：只列出不包含指定提交的标签（如果未指定，则为 HEAD）。
- `-s`、`--sign`：使用默认邮箱地址密钥创建一个 GPG 签名标签。
- `-u <keyid>`、`--local-user=<keyid>`：使用指定密钥创建 GPG 签名标签。
- `-v`、`--verify`：验证指定标签的 GPG 签名。
