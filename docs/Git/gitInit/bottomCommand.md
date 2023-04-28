---
title: Git 底层命令
author: 向阳
date: 2023-04-21
---

## Git 底层命令

### 上层命令 与 底层命令

**上层命令**

面向用户的更友好的命令：如 checkout、branch、remote 等约 30 个 Git 的子命令。

**底层命令**

用于完成底层工作的子命令，这些命令被设计成能以 UNIX 命令行的风格连接在一起，抑或藉由脚本调用，来完成工作。
多数底层命令并不面向最终用户：它们更适合作为新工具的组件和自定义脚本的组成部分。

这里我们主要面对底层命令。 因为，底层命令得以让你窥探 Git 内部的工作机制，也有助于说明 Git 是如何完成工作的，以及它为何如此运作。

### 常见 git 底层命令记录

<https://www.wenjiangs.com/doc/git-hash-object>
`git hash-object`创建一个新的数据对象并将它手动存入你的新 Git 数据库中

```bash
# 在下面这种最简单的形式中，git hash-object 会接受你传给它的东西，而它只会返回可以存储在 Git 仓库中的唯一键。
# | 管道符将上一条命令的输出，作为下一条命令参数
# -w 会指示该命令不要只返回键，还要将该对象写入数据库中（即不写-w，则只会计算出它的键并返回出来，但是并不会写入数据库）
# 最后，--stdin 选项则指示该命令从标准输入读取内容（即管道符前面的输出作为它的输入）；若不指定此选项，则须在命令尾部给出待存储文件的路径
$ echo 'test content' | git hash-object -w --stdin
d670460b4b4aece5915caf5c68d12f560a9fe3e4


$ git hash-object -w test.txt
```

`git cat-file -p`一旦你将内容存储在了对象数据库中，那么可以通过 cat-file 命令从 Git 那里取回数据。 这个命令简直就是一把剖析 Git 对象的瑞士军刀。 为 cat-file 指定 -p 选项可指示该命令自动判断内容的类型，并为我们显示大致的内容：

<https://www.wenjiangs.com/doc/git-cat-file>

```bash
$ git cat-file -p d670460b4b4aece5915caf5c68d12f560a9fe3e4
# 存储在里面的文件内容，比如之前存入了"test content"
test content
```

`git cat-file -t`：可以让 Git 告诉我们其内部存储的任何对象类型，只要给定该对象的 SHA-1 值：

```bash
$ git cat-file -t 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a
blob
```

git cat-file -p master^{tree}：表示 master 分支上最新的提交所指向的树对象，每条记录有一个指向数据对象或者子树对象的 SHA-1 指针，以及相应的模式、类型、文件名信息。

```bash
# 三种模式即是 Git 文件（即数据对象）的所有合法模式（当然，还有其他一些模式，但用于目录项和子模块）
# 100644，表明这是一个普通文件
# 100755，表示一个可执行文件；
# 120000，表示一个符号链接。
$ git cat-file -p master^{tree}
100644 blob a906cb2a4a904a152e80877d4088654daad0c859      README
100644 blob 8f94139338f9404f26296befa88755fc2598c289      Rakefile
040000 tree 99f1a6d12cb4b6f19c8655fca46c3ecf317074e0      lib
```

`git update-index`创建暂存区

```bash
# 利用该命令，可以把 test.txt 文件的首个版本人为地加入一个新的暂存区。 必须为上述命令指定 --add 选项，因为此前该文件并不在暂存区中（我们甚至都还没来得及创建一个暂存区呢）； 同样必需的还有 --cacheinfo 选项，因为将要添加的文件位于 Git 数据库中，而不是位于当前目录下。 同时，需要指定文件模式、SHA-1 与文件名：
$ git update-index --add --cacheinfo 100644 \
  83baae61804e65cc73a7201a7252750c76066a30 test.txt
```

`git write-tree`令将暂存区内容写入一个树对象

```bash
git write-tree
```

`git read-tree`命令，可以把树对象读入暂存区

```bash
$ git read-tree --prefix=bak d8329fc1cc938780ffdd9f94e0d364e0ea74f579
$ git write-tree
3c4e9cd789d88d8d89c1073707c3585e41b0e614
$ git cat-file -p 3c4e9cd789d88d8d89c1073707c3585e41b0e614
040000 tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579      bak
100644 blob fa49b077972391ad58037050f2a75f74e3671e92      new.txt
100644 blob 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a      test.txt
```

`git commit-tree`创建一个提交对象，为此需要指定一个树对象的 SHA-1 值，以及该提交的父提交对象（如果有的话）

```bash
$ echo 'first commit' | git commit-tree d8329f
fdf4fc3344e67ab068f836878b6c4951e3b15f3d

# 查看这个新提交对象
$ git cat-file -p fdf4fc3
tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
author Scott Chacon <schacon@gmail.com> 1243040974 -0700
committer Scott Chacon <schacon@gmail.com> 1243040974 -0700

first commit
```

`git gc --auto`手动执行垃圾回收

```bash
$ git gc --auto
```

### 其他 linux 命令记录

<https://www.linuxprobe.com/linux-common.html>
<https://blog.csdn.net/succing/article/details/127355545?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-127355545-blog-123409006.235^v31^pc_relevant_default_base3&spm=1001.2101.3001.4242.1&utm_relevant_index=3>

<https://blog.csdn.net/carefree2005/article/details/115372564>
<http://c.biancheng.net/view/779.html>
find:用来在指定目录下查找文件。如果使用该命令时，不设置任何参数，则 find 命令将在当前目录下查找子目录与文件。并且将查找到的子目录和文件全部进行显示。
find 目录 -type f：在目录下查找 type 为普通类型的文档

```bash
# -type:查找某一类型文档
# b:块设备文档
# d:目录
# c:字符设备文档
# P：管道文档
# l:符号链接文档
# f:普通文档
# 连起来就是查找type为普通类型的文档。
find .git/objects -type f
```

echo 命令:可以直接打印输出内容，也可以直接对文件内容进行修改（文件不存在则会创建）

```bash
# echo “xxxxxx” 　　回车后会直接输出 xxxxxx
# echo xxxxxx > 文件名　　会将文件内容直接替换为 xxxxxx
# echo xxxxxx >> 文件名　　会在文件内容后追加 xxxxxx
```

|：管道的作用

```bash
# | 表示管道，上一条命令的输出，作为下一条命令参数，通常用来过滤/汇总数据。
# 语法格式： command1 | command2 [ | command3 … ]
```

[mac bash 和 zsh 的区别](https://huaweicloud.csdn.net/63563b7bd3efff3090b5b885.html?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~activity-1-124974336-blog-117867657.235^v31^pc_relevant_default_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~activity-1-124974336-blog-117867657.235^v31^pc_relevant_default_base3&utm_relevant_index=2)

cat 查看文件内容
<http://www.nndssk.com/xtwt/147892n1prMY.html>

```shell
cat [参数] [文件]
# 查看yum.conf文件
cat yum.conf

# 如果需要显示文件内容的行数，可以使用参数-n
cat -n yum.conf

# -n参数会对文件的每行内容都编制一个编号，及时是空行。如果需要多个空行算为一个编号，可以使用-s参数
cat -s yum.conf

# 如果显示文件内容要求不对空行编号，可以使用命令-b
cat -b yum.conf

# 有的时候为了区分每行的结束部分，可以使用命令-E，在每行结束出显示$符号
cat -E yum.conf

```

[Linux 常用 ls 命令详解](http://aiezu.com/article/88.html)
