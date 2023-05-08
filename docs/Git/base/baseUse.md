---
title: git 安装与配置
author: 向阳
date: 2023-03-27
---

## git 安装与配置

### Git 安装

在 Git 官网下载、安装即可：<https://git-scm.com/download>。
![git install](../imgs/gitInstall.jpg)
安装完成之后，可以使用以下命令来查看 Git 是否安装成功：

```bash
git --version
```

如果安装成功，终端会打印安装的 Git 的版本：

```bash
git version 2.37.0 (Apple Git-136)
```

### 初次运行 Git 前的配置

既然已经在系统上安装了 Git，你会想要做几件事来定制你的 Git 环境。 每台计算机上只需要配置一次，程序升级时会保留配置信息。 你可以在任何时候再次通过运行命令来修改它们。

#### git config 工具了解

Git 自带一个 git config 的工具来帮助设置控制 Git 外观和行为的配置变量，这些变量存储在三个不同的位置。每一个级别会覆盖上一级别的配置，所以 .git/config 的配置变量会覆盖 /etc/gitconfig 中的配置变量：

1. `/etc/gitconfig 文件`: 包含系统上每一个用户及他们仓库的通用配置。 如果在执行 git config 时带上 --system 选项，那么它就会读写该文件中的配置变量。 （由于它是系统配置文件，因此你需要管理员或超级用户权限来修改它。）
2. `~/.gitconfig 或 ~/.config/git/config 文件`：只针对当前用户。 你可以传递 --global 选项让 Git 读写此文件，这会对你系统上 所有 的仓库生效。
3. `当前使用仓库的 Git 目录中的 config 文件（即 .git/config）`：针对该仓库。 你可以传递 --local 选项让 Git 强制读写此文件（默认情况下用的就是它）。

你可以通过以下命令查看所有的配置以及它们所在的文件（已经配置过很多设置）：

```bash
$ git config --list --show-origin
# 系统上，针对所有用户及仓库的通用配置
file:/Library/Developer/CommandLineTools/usr/share/git-core/gitconfig   credential.helper=osxkeychain
file:/Library/Developer/CommandLineTools/usr/share/git-core/gitconfig   init.defaultbranch=main
# 针对当前用户，全局的 dameizi/.gitconfig文件
file:/Users/dameizi/.gitconfig  user.name=私密信息，不作展示
file:/Users/dameizi/.gitconfig  user.email=私密信息，不作展示
file:/Users/dameizi/.gitconfig  user.password=私密信息，不作展示
file:/Users/dameizi/.gitconfig  color.ui=true
# 当前项目下的 .git/config文件
file:.git/config        core.repositoryformatversion=0
file:.git/config        core.filemode=true
file:.git/config        core.bare=false
file:.git/config        core.logallrefupdates=true
file:.git/config        core.ignorecase=true
file:.git/config        core.precomposeunicode=true
file:.git/config        core.hookspath=.husky
file:.git/config        remote.origin.url=git@github.com:AliceLi11/vuepress-starter.git
file:.git/config        remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
file:.git/config        branch.main.remote=origin
file:.git/config        branch.main.merge=refs/heads/main
```

#### 用户信息

安装完 Git 之后，要做的第一件事就是设置你的用户名和邮件地址。 这一点很重要，因为每一个 Git 提交都会使用这些信息，它们会写入到你的每一次提交中，不可更改：

```bash
# 如果使用了 --global 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情， Git 都会使用那些信息。
# 全局设置，配置保存在dameizi/.gitconfig文件

$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 --global 选项的命令来配置。

```bash
# 针对当前仓库(项目)，配置保存在当前仓库的 Git 目录中的 config 文件
$ git config user.name "John Doe2"
$ git config user.email johndoe2@example.com
```

查看设置的用户名/设置的 email：

```bash
# 查看--global选项下的配置
$ git config --global user.name
$ git config --global user.email
John Doe
johndoe@example.com

# 查看最后生效的配置
$ git config user.name
$ git config user.email
John Doe2
johndoe2@example.com
```

#### 设置命令颜色

除了上述两个基本的设置之外，还可以设置命令的颜色，以使输出具有更高的可读性：

```bash
 #打开颜色显示
 git config --global color.ui true
 #关闭颜色显示，即默认黑白
 git config --global color.ui false
```

#### 设置别名

git config 命令为我们提供了一种创建别名的方法，这种别名通常用于缩短现有的命令或者创建自定义命令。

```bash
# 示例：可自己根据需要进行设置

$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status

$ git config --global alias.cm "commit -m"
# 这样在提交暂存区文件时，只需要输入以下命令即可：
git cm <message>

# 为取消暂存设置你觉得好记的应该存在的命令为别名（unstage）
$ git config --global alias.unstage 'reset HEAD --'
# 设置别名后，这两个命令等价
$ git unstage fileA
$ git reset HEAD -- fileA

# 为查看当前分支上一次的提交记录设置别名（last)
$ git config --global alias.last 'log -1 HEAD'
# 设置别名后，这两个命令等价
$ git log -1 HEAD
$ git last

# 如果想要执行外部命令，而不是一个 Git 子命令，可以在命令前面加入 ! 符号。 如果你自己要写一些与 Git 仓库协作的工具的话，那会很有用。 如将 git visual 定义为 gitk 的别名：
$ git config --global alias.visual '!gitk'
```

如果你想要执行外部命令，而不是 Git 子命令，可以在命令前面加上`!`符号。如果你自己要写一些与 Git 仓库协作的工具的话，那会很有用。

```bash
# 将 git visual 定义为 gitk(git图形化工具) 的别名
$ git config --global alias.visual '!gitk'
```

#### 检查配置信息

如果想要检查你的配置，可以使用 `git config --list` 命令来列出所有 Git 当时能找到的配置。

- 你可能会看到重复的变量名，因为 Git 会从不同的文件中读取同一个配置（例如： ~/.gitconfig 与 .git/config）。 这种情况下，Git 会使用它找到的每一个变量的最后一个配置。

```bash
$ git config --list
credential.helper=osxkeychain
init.defaultbranch=main
user.name=John Doe
user.email=johndoe@example.com
user.password=Johnjohndoe
color.ui=true
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
core.ignorecase=true
core.precomposeunicode=true
core.hookspath=.husky
user.name=testLi
user.email=111111@qq.com
remote.origin.url=git@github.com:AliceLi11/vuepress-starter.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
branch.main.remote=origin
branch.main.merge=refs/heads/main
```

你也可以通过输入 `git config <key>`： 来检查 Git 的某一项配置

```bash
# 结合以上输出的所有配置可看到user.name重复，后者(当前仓库下的设置)覆盖前者(全局设置)
$ git config user.name
testLi
```

由于 Git 会从多个文件中读取同一配置变量的不同值，因此你可能会在其中看到意料之外的值而不知道为什么。 此时，你可以查询 Git 中该变量的 原始 值，它会告诉你哪一个配置文件最后设置了该值：

```bash
$ git config --show-origin  user.name
file:.git/config        testLi
```

### 获取帮助

若你使用 Git 时需要获取帮助，有三种等价的方法可以找到 Git 命令的综合手册（manpage）：

```bash
$ git help <verb>
$ git <verb> --help
$ man git-<verb>

# 例如，要想获得 git config 命令的手册
$ git help config
```

如果你不需要全面的手册，只需要可用选项的快速参考，那么可以用 -h 选项获得更简明的 ``help'' 输出：

```bash
$ git add -h
usage: git add [<options>] [--] <pathspec>...

    -n, --dry-run         dry run
    -v, --verbose         be verbose

    -i, --interactive     interactive picking
    -p, --patch           select hunks interactively
    -e, --edit            edit current diff and apply
    -f, --force           allow adding otherwise ignored files
    -u, --update          update tracked files
    --renormalize         renormalize EOL of tracked files (implies -u)
    -N, --intent-to-add   record only the fact that the path will be added later
    -A, --all             add changes from all tracked and untracked files
    --ignore-removal      ignore paths removed in the working tree (same as --no-all)
    --refresh             don't add, only refresh the index
    --ignore-errors       just skip files which cannot be added because of errors
    --ignore-missing      check if - even missing - files are ignored in dry run
    --sparse              allow updating entries outside of the sparse-checkout cone
    --chmod (+|-)x        override the executable bit of the listed files
    --pathspec-from-file <file>
                          read pathspec from file
    --pathspec-file-nul   with --pathspec-from-file, pathspec elements are separated with NUL character
```

#### 总结命令

```bash
# 查看git版本
$ git --version
git version 2.37.0 (Apple Git-136)

# 查看所有的配置以及它们所在的文件
$ git config --list --show-origin
file:/Library/Developer/CommandLineTools/usr/share/git-core/gitconfig   credential.helper=osxkeychain
file:/Library/Developer/CommandLineTools/usr/share/git-core/gitconfig   init.defaultbranch=main
file:/Users/dameizi/.gitconfig  user.name=suanmei
...

# 查看哪一个配置文件最后设置了某变量的值(如果变量名重复，会输出最后的值)
$ git config --show-origin  user.name
file:.git/config        testLi

# 查看所有Git能找到的配置
$ git config --list
credential.helper=osxkeychain
init.defaultbranch=main
user.name=John Doe
...

# 查看某一个变量最后生效的配置
$ git config user.name

# 查看--global选项下的配置
$ git config user.name
```
