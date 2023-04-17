<!--
 * @Descripttion:
 * @Author: suanmei
 * @Date: 2023-03-30 22:32:58
 * @LastEditors: suanmei
 * @LastEditTime: 2023-03-31 17:52:37
-->

---

title: husky 和 git hooks 之间的联系
author: 向阳
date: 2023-03-30

---

## 浅谈 husky 和 git hooks 之间的联系

### 认识 git hook

- 作用:
  - [git hook](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90) 让我们可以在 git 执行一些行为的前后时机，执行一些自定义脚本。<br>
- 安装钩子:
  - 钩子都被存储在 Git 目录下的 `hooks` 子目录中。当你用 `git init`初始化一个新版本库时，Git 默认会在 `.git/hooks` 中放置一些示例脚本，这些示例的名称都是以`.sample`结尾。这些脚本除了本身可以被调用外，它们还透露了被触发时所传入的参数。 所有的示例都是 shell 脚本。如果你想启用它们，得先移除这个后缀，这样一来，它就能被 Git 调用。
- 钩子种类(我们这里主要看两个提交相关的钩子):
  - `pre-commit`钩子: 在键入提交信息前运行。它用于检查即将提交的快照。例如，检查是否有所遗漏，确保测试运行，以及核查代码。 如果该钩子以非零值退出，Git 将放弃此次提交，不过你可以用 `git commit --no-verify` 来绕过这个环节。 你可以利用该钩子，来检查代码风格是否一致（运行类似 lint 的程序）、尾随空白字符是否存在（自带的钩子就是这么做的），或新方法的文档是否适当。
  - `commit-msg`: 钩子接收一个参数，存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。
- 为什么需要借助 husky[参考文档](https://juejin.cn/post/7025880096791592968)
  - 虽然这样对我们本地来讲是可行的，但要注意，.git 文件夹的改动无法同步到远端仓库。 所以我们期望将 git-hook 的执行权移交到外面来。怎么做呢？
    - 1.回到项目根目录下，新建一个文件夹。暂时命名.mygithooks。然后在此文件夹下，新增一个 git-hook 文件，命名为 pre-commit，并写入以下内容
    ```bash
    echo pre-commit执行啦
    ```
    - 2.好了，我们新建了自己的 git-hook，但此时 git 并不能识别。下面我们执行这行命令。它给我们自己的文件，配置了 git-hook 的执行权限：
    ```bash
    # 项目根目录下
    git config core.hooksPath .mygithooks/pre-commit
    ```
    - 3.但这个时候我们 git commit 的话，可能会报这样的 waring，并且没有执行我们的 shell：
    ```bash
    hint: The 'pre-commit' hook was ignored because it's not set as executable.
    hint: You can disable this warning with `git config advice.ignoredHook false`
    ```
    这是因为我们的操作系统没有给出这个文件的可执行权限。 因此我们得再执行这样一句命令：
    ```bash
    chmod +x .mygithooks/pre-commit
    ```
    ok！现在我们尝试执行 git add . && git commit -m "any meesage" 我们发现控制台日志会先打印 “pre-commit 执行啦” 这意味着成功啦！

### 关于 git hooks

- 作用：
  - git hook 让我们可以在 git 执行一些行为的前后时机，执行一些自定义脚本。
- 钩子种类(我们这里主要看两个提交相关的钩子):
  - `pre-commit`钩子: 在键入提交信息前运行。它用于检查即将提交的快照。例如，检查是否有所遗漏，确保测试运行，以及核查代码。 如果该钩子以非零值退出，Git 将放弃此次提交，不过你可以用 `git commit --no-verify` 来绕过这个环节。 你可以利用该钩子，来检查代码风格是否一致（运行类似 lint 的程序）、尾随空白字符是否存在（自带的钩子就是这么做的），或新方法的文档是否适当。
  - `commit-msg`: 钩子接收一个参数，存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。
- 钩子 的使用

  - 默认情况下钩子都被存储在 Git 目录下的 hooks 子目录中。当你用 git init 初始化一个新版本库时，Git 默认会在 .git/hooks 中放置一些示例脚本(shell 脚本)，这些示例的名称都是以.sample 结尾。如果你想启用它们，得先移除这个后缀，这样一来，它就能被 Git 调用。

- 那既然 git hooks 就能校验，为什么还需要 husky 呢

### TODO

- 1.git hooks
- 2.shengbang 命令
- 3.为什么可以执行 npx cz
- 4.element-ui 中 body 怎么描述的
- 5.为什么别人 commit 提交后控制台会有显示信息，是不是用了钩子
- 6.日志是不是有 npm 包可以自动生成
- 7.lint+pre-commit
- 8.commitizen 配置 path 后理解(https://github.com/commitizen/cz-cli)
- 9.npm 升级最好是升级 node,从而带动捆绑的 npm 吗
- 10.husky 的 husky.sh 中的脚本意思
- （已写）11.手写命令，不会生效，需要执行权。
- 12.npm run 和 npx 的区别以及 npm run 背后机制（阮一峰，npm scripts）
- 13.nrm(sz-ui)
- 14.[发版自动生成 changelog](https://baijiahao.baidu.com/s?id=1670458551636347332):可以看看他的一些文章，老是比较老了https://author.baidu.com/home?from=bjh_article&app_id=1600991971906699
- 15.npm 私源怎么搞
- 16.怎么打 tag
- 17.表格嵌套表格
