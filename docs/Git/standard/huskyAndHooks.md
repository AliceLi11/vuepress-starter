---
title: husky 和 git hooks 之间的关系
author: 向阳
date: 2023-03-30
---

## git hooks 的使用

### 前言

当前环境

> 操作系统: macOS；Node 版本: v14.18.2；npm 版本: 6.14.15；npx 版本: 6.14.15；git 版本: 2.37.0

### 先来简单了解下 git hooks：

- [git hooks](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90) 让我们可以在 git 执行一些行为的前后时机，执行一些自定义脚本。默认情况下钩子都被存储在 Git 目录下的 hooks 子目录中。（当你用 git init 初始化一个新版本库时，Git 默认会在 .git/hooks 中放置一些示例的 shell 脚本，这些示例的名称都是以.sample 结尾，里面有详细的使用说明）。如果你想启用它们，得先移除这个后缀，或者新建不带后缀的同名文件。这样一来，它就能被 Git 调用。
- git hooks 种类很多，比如`pre-commit`、`commit-msg`、`prepare-commit-msg`钩子等。

### git hooks 使用

在'.git/hooks'中使用钩子，虽然这样对我们本地来讲是可行的。但要注意，.git 文件夹的改动无法同步到远端仓库。 所以我们期望将 git-hook 的配置权移交到外面来。怎么做呢？我们使用一个例子来说明：

- 我们期望在 git 提交(commit)时，对我们提交的 commit message 进行规范检测，如果不能通过检测，就无法提交我们的代码。 那么自然而然的，这个动作的时机应该是 commit-msg 钩子。
- 我们回到项目的根目录下,然后新建一个文件夹，暂时命名为.mygithooks，然后在里面新建钩子。

```bash
# 手动在此文件夹下，新增一个 git-hook 文件,命名为 pre-commit，并写入以下内容：

#!/usr/bin/env sh
echo "commit-msg执行啦"
```

- 我们已经新建了自己的 git-hook，但此时 git 并不能识别。我们需要执行下面这行命令来移交 git-hook 的配置权限给我们自己的文件：

```bash
项目根目录下> git config core.hooksPath .mygithooks

# 然后可以使用下面的命令来确定是否配置成功。（查看是否存在core.hookspath=.mygithooks）
git config --list
```

- 但这个时候我们 git commit 的话，可能会报这样的 waring，并且没有执行我们的 shell：

```bash
hint: The 'commit-msg' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`
```

- 这是因为我们的操作系统没有给出这个文件的可执行权限。所以我们要将该文件设置为可执行文件：

```bash
chmod u+x .mygithooks/commit-msg
```

- ok！现在我们尝试执行 git add . && git commit -m "any meesage" 我们发现控制台日志会先打印 “commit-msg 执行啦” 这意味着成功啦！

- 这时候我们可以完善一开始的需求了。

  - Commit message 规范性检测： 借助 [commlint 工具](https://commitlint.js.org/#/guides-local-setup)

  ```bash
  # 安装 @commitlint/config-conventional 和 @commitlint/cli。
  npm install --save-dev @commitlint/config-conventional @commitlint/cli

  # 配置 commitlint
  echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
  ```

  - 在 commit-msg 里写入以下脚本：

  ```bash
  #!/usr/bin/env sh

  npx --no-install commitlint --edit "$1"
  ```

  - 测试

  ```bash
  # 不规范的提交，commit失败
  dameizi@dameizideMacBook-Pro testcommit % git commit -m "1"
  ⧗   input: 1
  ✖   subject may not be empty [subject-empty]
  ✖   type may not be empty [type-empty]

  ✖   found 2 problems, 0 warnings
  ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

  # 符合规范的提交，commit成功
  dameizi@dameizideMacBook-Pro testcommit % git commit -m "docs: update"
  [main f647308] docs: update
  1 file changed, 0 insertions(+), 0 deletions(-)
  mode change 100644 => 100755 .mygithooks/commit-msg
  ```

- 当你的项目可能有其他成员加入时，怎么像其他项目一样，不需要多出其他操作，就能同步你的配置呢。

```js
// 在 npm scripts 中配置 'prepare' npm钩子:
...
"scripts":{
   "prepare": "git config core.hooksPath .mygithooks"
}
```

### 总结

也就是说，我们搞 git-hook 的话，要分以下几步走：

1. 新增任意名称文件夹 如:`.mygithooks`以及文件 如:commit-msg(这个文件名字要和要使用的 git-hook 名字一致)！
2. 执行以下命令来移交 git-hook 的配置权限

```bash
git config core.hooksPath .mygithooks/commit-msg
```

3. 给这个文件添加可执行权限：

```bash
chmod +x .mygithooks/commit-msg
```

然后就成功啦,这时候我们可以在 commit-msg 里写任意脚本，比如：

```bash
#!/usr/bin/env sh
echo "commit-msg执行啦"
```

4. 为了项目其他成员也能同步配置，所以在 npm scripts 中配置 prepare

```js
{
    "scripts": {
      "prepare":"git config core.hooksPath .mygithooks"
    }
  }
```

### husky

husky 就是做和上述一样的事情。拿 husky 官方推荐的自动配置来说:

```bash
npx husky-init && npm install
```

这个命令做了 3 件事:

- 1.安装 husky 相关的依赖。
- 2.启用 git hook(按手动配置来并不会自动生成 pre-commit hook 示例)。

  - 在项目根目录下创建 `.husky` 文件夹（其中放置 git hooks）。

  ```bash
  # 生成的.husky文件夹
  .husky
  ├── _
  │   ├── .gitignore
  │   └── husky.sh
  └── pre-commit
  ```

  - 同时还将 git 所在项目本地环境的 core.hookspath 设置为.husky。

  ```bash
  # 可通过以下命令查看是否移交了 git-hook 的配置权限。即可以找到 core.hookspath=.husky
  git config --list

  # 如果没有，我们只需要手动的给加上就行：
  git config core.hooksPath .husky
  ```

- 3.在 package.json 中添加一个脚本

  - prepare 是一个 npm 钩子，执行时机是 npm install 之后，npm publish 之前。这里保证其他同事拉项目并安装依赖后，会执行 husky install 命令，即 启用 git hook。

  ```js
  {
    "scripts": {
      "prepare": "husky install"
    }
  }
  ```

### 友情链接

[借鉴文档](https://juejin.cn/post/7025880096791592968)<br>
[git hooks](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
