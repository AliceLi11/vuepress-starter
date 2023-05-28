---
title: git 远程操作
author: 向阳
date: 2023-03-27
---

## 远程仓库使用

版本库：又名仓库，可以简单理解成一个目录，这个目录里面的所有文件都可以被 Git 管理起来，每个文件的修改、删除，Git 都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

远程仓库：指托管在因特网或其他网络中的你的项目的版本库(远程只是表示它在别处，也可以在你的本地主机上)。

Tip：你可以有好几个远程仓库，通常有些仓库对你只读，有些则可以读写。 管理远程仓库包括了解如何添加远程仓库、移除无效的远程仓库、管理不同的远程分支并定义它们是否被跟踪等等。

### 1.查看远程仓库

```shell
# 如果已经克隆了自己的仓库，那么至少应该能看到 origin ——这是 Git 给你克隆的仓库服务器的默认名字
$ git remote
origin

# 可以指定选项 -v，会显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL
$ git remote -v
origin  git@github.com:AliceLi11/vuepress-starter.git (fetch)
origin  git@github.com:AliceLi11/vuepress-starter.git (push)


# 如果有多个远程仓库，例如与几个协作者合作的，也能全部列出。这表示我们能非常方便地拉取其它用户的贡献，还可以拥有向他们推送的权限（TODO:还没见过多个远程仓库的）
$ git remote -v
# 注意这些远程仓库使用了不同的协议
bakkdoor  https://github.com/bakkdoor/grit (fetch)
bakkdoor  https://github.com/bakkdoor/grit (push)
koke      git://github.com/koke/grit.git (fetch)
koke      git://github.com/koke/grit.git (push)
origin    git@github.com:mojombo/grit.git (fetch)
origin    git@github.com:mojombo/grit.git (push)
...

```

**查看某个远程仓库**

会得到更加详细的信息：

```shell
$ git remote show <remote>

# 如：
$ git remote show origin
* remote origin
  URL: https://github.com/my-org/complex-project
  Fetch URL: https://github.com/my-org/complex-project
  Push  URL: https://github.com/my-org/complex-project
  # 正处于什么分支
  HEAD branch: master
  # 列出了哪些远程分支已被跟踪、哪些远程分支不在你的本地、哪些远程分支已经从服务器上移除了
  Remote branches:
    master                           tracked
    dev-branch                       tracked
    markdown-strip                   tracked
    issue-43                         new (next fetch will store in remotes/origin)
    issue-45                         new (next fetch will store in remotes/origin)
    refs/remotes/origin/issue-11     stale (use 'git remote prune' to remove)
  # 执行git pull时，哪些本地分支可以与它跟踪的远程分支自动合并
  Local branches configured for 'git pull':
    dev-branch merges with remote dev-branch
    master     merges with remote master
  # 当你在特定的分支上执行git push会自动推送到哪一个远程分支
  Local refs configured for 'git push':
    dev-branch                     pushes to dev-branch                     (up to date)
    markdown-strip                 pushes to markdown-strip                 (up to date)
    master                         pushes to master                         (up to date)
```

### 2.添加远程仓库

运行`git remote add <shortname> <url>` 添加一个新的远程 Git 仓库，同时指定简写

```shell
$ git remote add <shortname> <url>
```

### 3.从远程仓库中抓取与拉取

```shell
$ git fetch <remote>
```

### 4.推送到远程分支

```shell
$ git push <remote> <branch>
```

### 5.远程仓库的重命名

注意：会同时修改所有远程跟踪的分支名字。比如过去引用 `pb/master` 的现在会引用 `paul/master`

```shell
# 修改一个远程仓库的简写名
$ git remote rename <老的shortname> <新的shortname>

# 示例：
$ git remote rename pb paul
```

### 6.远程仓库的移除

注意：所有和这个远程仓库相关的远程跟踪分支以及配置信息也会一起被删除

```shell
$ git remote remove <shortname>
# 或者
$ git remote rm <shortname>

# 示例：
$ git remote remove paul
```

## 远程分支的使用

远程引用：对远程仓库的引用（指针），包括分支、标签等等。

```shell
# 可以通过`git ls-remote <remote>`来显式地获得远程引用的完整列表。
$ git ls-remote origin
b7d401abaa68b753cf7dc3416997611745246efd        HEAD
b7d401abaa68b753cf7dc3416997611745246efd        refs/heads/main
b7d401abaa68b753cf7dc3416997611745246efd        refs/tags/test

# 或者通过git remote show <remote> 获得远程分支的更多信息
$ git remote show origin
* remote origin
  Fetch URL: git@github.com:AliceLi11/vuepress-starter.git
  Push  URL: git@github.com:AliceLi11/vuepress-starter.git
  HEAD branch: main
  Remote branch:
    main tracked
  Local branch configured for 'git pull':
    main merges with remote main
  Local ref configured for 'git push':
    main pushes to main (up to date)
```

远程跟踪分支：以`<remote>/<branch>`的形式命名，是远程分支状态的引用。该引用存储在 `refs/remotes/<远程仓库 remote>/<远程分支>`中，只能通过网络通信（推送/拉取）移动引用。可以把它看作书签，记录着最近一次连接远程仓库中它的引用。

跟踪分支：从一个远程跟踪分支检出一个本地分支会自动创建所谓的“跟踪分支”（它跟踪的分支叫做“上游分支”）。 跟踪分支是与远程分支有直接关系的本地分支。 如果在一个跟踪分支上输入 git pull，Git 能自动地识别去哪个服务器上抓取、合并到哪个分支。(当克隆一个仓库时，它通常会自动地创建一个跟踪 origin/master 的 master 分支。)

### 推送

```shell
$ git push <remote> <branch>
# 如：
# Git自动将远serverfix分支名字展开为refs/heads/serverfix:refs/heads/serverfix
# 推送本地的 serverfix 分支来更新远程仓库上的 serverfix 分支。
$ git push origin serverfix

# 或者
$ git push origin serverfix:awesomebranch
# 推送本地分支到一个命名不相同的远程分支
$ git push origin serverfix:awesomebranch
```

### 跟踪分支

```shell
$ git checkout -b <本地分支> <远程仓库>/<远程分支>

# --track快捷方式
$ git checkout --track origin/serverfix

# 如果检出的分支(a)不存在，且刚好只有一个名字匹配的远程分支(b)，Git会创建一个跟踪分支serverfix
$ git checkout serverfix

# 将本地分支与远程分支设置为不同的名字
$ git checkout -b sf origin/serverfix

# 可以给本地分支设置跟踪或者修改正在跟踪的上游分支
$ git branch -u origin/serverfix
```

**上游分支快捷方式**

```shell
# 当设置好跟踪分支后，可以通过简写 @{upstream} 或 @{u} 来引用它的上游分支，如：
$ git merge @{u} 来取代 git merge origin/master。
```

**查看设置的所有跟踪分支**

```shell
# 这会将所有的本地分支列出来并且包含更多信息，如每一个分支正在更总哪个远程分支与本地分支是否是领先、落后或是都有
$ git branch -vv

  # iss53 分支正在跟踪 origin/iss53；
  # ahead 2意味着本地有两个提交还没有推送到服务器上；
  # SHA-1值指向的是当前远程跟踪分支所指向的提交对象(该远程跟踪分支的SHA-1值存储在refs/remotes/origin/iss53的文件中)
  # forgot the brackets是commit msg
  iss53     7e424c3 [origin/iss53: ahead 2] forgot the brackets
  # master 分支正在跟踪 origin/master 分支并且是最新的
  master    1ae2a45 [origin/master] deploying index fix
  # serverfix 分支正在跟踪 teamone 服务器上的 server-fix-good
  # 服务器上有一次提交还没有合并入同时本地有三次提交还没有推送
* serverfix f8674d9 [teamone/server-fix-good: ahead 3, behind 1] this should do it
  # testing 分支并没有跟踪任何远程分支。
  testing   5ea463a trying something new
```

注意：这个命令并没有连接服务器，所以这些信息都只是本地缓存的服务器数据，即上次从服务器抓取的数据。所以需要先抓取所有的远程仓库才能得到最新的数据。

```shell
$ git fetch --all; git branch -vv
```

### 拉取

```shell
# 从服务器上抓取本地没有的数据时，它并不会修改工作目录中的内容。 它只会获取数据然后让你自己合并
$ git fetch

# 相当于git fetch + git merge，通过查找当前分支所跟踪的服务器与分支，从服务器抓取数据然后尝试合并入那个远程分支
# 通常单独使用fetch + merge好一些，这个命令的魔法经常令人困惑
$ git pull
```

### 删除远程分支

基本上这个命令做的只是从服务器上移除这个指针。 Git 服务器通常会保留数据一段时间直到垃圾回收运行，所以如果不小心删除掉了，通常是很容易恢复的。

```shell
$ git push <远程仓库名> --delete <远程分支名>
```
