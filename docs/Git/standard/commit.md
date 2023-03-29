---
title: git commit
author: 向阳
date: 2023-03-27
---

## git commit 规范

### 前言

什么是 Commit message

```bash
# Git 每次提交代码，都要写 Commit message（提交说明），否则就不允许提交。下面代码的-m参数，就是用来指定 commit mesage 的。
git commit -m "hello world"
```

为什么要有 Commit message 规范，以及怎么去做好规范

> 通常我们的 git commit 会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。如果每次手动来编写这些是比较麻烦的事情，我们可以使用工具。

> 目前，社区有多种 Commit message 的写法规范。本文介绍 Angular 规范，这是目前使用最广的写法，比较合理和系统化，并且有配套的工具。

工具推荐:

- [Commitizen](https://github.com/commitizen/cz-cli)：是一个撰写合格 Commit message 的工具。
- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)：是符合 AngularJS 规范的 Commitizen 标准配置插件。
- [standard-version](https://github.com/conventional-changelog/standard-version)：根据符合规范的 commit 记录自动生成更改日志文件。
- [commitlint](https://github.com/conventional-changelog/commitlint)：检查 commit 信息是否符合规范。

### commit 格式规范:

- 每条 commit 记录都由 `header`、`body`、`footer` 组成。其中，Header 是必需的，Body 和 Footer 可以省略。
  - Header: 由 type(类型(必需))、scope(修改范围(可选))、subject(简短描述(必需))组成。
  - Body: 对本次 commit 的详细描述。应该说明代码变动的动机，以及与以前行为的对比。
  - Footer: 只用于两种情况。
    - 1.如果是一个大的变动，则 Footer 部分以 BREAKING CHANGE 开头，后面是对变动的描述。
    - 2.issue 相关(e.g. "fix #123", "re #123".)。

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

- 认识 header 中的 type(更新的类型)：
  | Type | 作用 |
  | -------- | -------------------------------------------------------------------------------------- |
  | feat | 新增特性 (A new feature) |
  | fix | 修复 Bug(A bug fix) |
  | docs | 修改文档 (Documentation only changes) |
  | style | 不影响代码运行的格式改动(Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)) |
  | refactor | 代码重构，即没有修复 bug 也没有新增功能(A code change that neither fixes a bug nor adds a feature) |
  | perf | 改善性能(A code change that improves performance) |
  | test | 测试(Adding missing tests or correcting existing tests) |
  | build | 变更项目构建或外部依赖,例如: webpack、gulp、npm 等。(Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)) |
  | ci | 对 CI(持续集成软件) 配置文件和脚本的变动，例如: Travis, Circle 等。(Changes to our CI configuration files and scripts (example scopes: Travis,Circle,BrowserStack,SauceLabs) )|
  | chore | 不涉及 src 或测试文件的代码变更(Other changes that don't modify src or test files) |
  | revert | 代码回退(Reverts a previous commit) |

### Commitizen 工具的使用

#### 安装

1.安装 Commitizen

```ssh
npm install commitizen -D
```

2.安装 cz-conventional-changelog，并且初始化 cz-conventional-changelog（这个工具可以提供规范选项按步骤操作即可）：

```ssh
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

- 这个命令除了会帮助我们安装 cz-conventional-changelog，还会在 package.json 中进行配置：

```js
"config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
}
```

#### 使用

1.执行`git add .`后使用`npx cz`代替`git commit`命令。也可以作为一个 npm 脚本`npm run commit`:

- 注意：如果想要用`git cz`命令，需要全局安装 commitizen。`npm install commitizen -g`。

```js
...
"scripts":{
    "commit":"cz"
}
```

- 第一步是选择 type，本次更新的类型：

```ssh
? Select the type of change that you're committing: (Use arrow keys)
❯ feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that do not affect the meaning of the code (white-space,
formatting, missing semi-colons, etc)
  refactor: A code change that neither fixes a bug nor adds a feature
  perf:     A code change that improves performance
  ...
(Move up and down to reveal more choices)
```

- 第二步是选择 scope，本次修改的范围：

```
What is the scope of this change (e.g. component or file name): (press enter to skip)
```

- 第三步是 subject，输入 commit 目的的简短描述：

```
Write a short, imperative tense description of the change (max 94 chars):
```

- 第四步是 body 部分，对本次 commit 的详细描述：

```
Provide a longer description of the change: (press enter to skip)
```

- 第五步否是一次重大的更改：

```bash
Are there any breaking changes (y/N)?
# 注意:如果选择y，那么 body 即详细描述就是必需的，另外还需要填入 对重大变动的描述(footer)
Describe the breaking changes:
```

- 第六步是否影响某个 open issue：

```bash
Does this change affect any open issues? (y/N)
# 注意:如果选择y，还需要填入影响的相关issue(footer)
Add issue references (e.g. "fix #123", "re #123".)
```

- 最后展示成果(全部信息都填了的效果，包括 y/N 都选择了 y)

```bash
docs(commit.md): edit commit.md
commit.md need to update

BREAKING CHANGE: test break change to be changed y

fix #pretend to exist an open issue，and solved it just now
```

#### 代码提交验证

如果我们按照 cz 来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？我们可以通过 commitlint（[github 链接](https://github.com/conventional-changelog/commitlint)、[文档链接](https://commitlint.js.org/#/guides-local-setup)）来限制提交。

1.安装 @commitlint/config-conventional 和 @commitlint/cli。（2 选 1）

```bash
# Install and configure if needed
npm install --save-dev @commitlint/{cli,config-conventional}
# For Windows:
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

2.配置 commitlint(2 选 1)

```bash
# Configure commitlint to use conventional config（自动）
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

#或者手动定义一个文件配置如下代码，可取 commitlint.config.js, .commitlintrc.js, .commitlintrc, .commitlintrc.json, .commitlintrc.yml ，也可以在package.json中使用 commitlint字段配置。
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3.使用 husky 生成 commit-msg 文件，验证提交信息：（输入命令前，先浏览下面的 husky 工具了解，按步骤配置完再回到这一步）

```
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

### husky 工具了解

> [husky](https://typicode.github.io/husky/#/?id=articles) 是一个 [git hook](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90) 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit、commit-msg、pre-push

#### 认识 git hook

- 作用:
  - git hook 让我们可以在 git 执行一些行为的前后时机，执行一些自定义脚本。<br>
- 安装钩子:
  - 钩子都被存储在 Git 目录下的 `hooks` 子目录中。当你用 `git init`初始化一个新版本库时，Git 默认会在 `.git/hooks` 中放置一些示例脚本，这些示例的名称都是以`.sample`结尾。这些脚本除了本身可以被调用外，它们还透露了被触发时所传入的参数。 所有的示例都是 shell 脚本。如果你想启用它们，得先移除这个后缀，这样一来，它就能被 Git 调用。
- 钩子种类(我们这里主要看两个提交相关的钩子):
  - `pre-commit`钩子: 在键入提交信息前运行。它用于检查即将提交的快照。例如，检查是否有所遗漏，确保测试运行，以及核查代码。 如果该钩子以非零值退出，Git 将放弃此次提交，不过你可以用 `git commit --no-verify` 来绕过这个环节。 你可以利用该钩子，来检查代码风格是否一致（运行类似 lint 的程序）、尾随空白字符是否存在（自带的钩子就是这么做的），或新方法的文档是否适当。
  - `commit-msg`: 钩子接收一个参数，存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。

#### 使用

一. 推荐使用自动配置命令

```ssh
npx husky-init && npm install
```

- 这个命令会做 3 件事：
  - 1.安装 husky 相关的依赖：
  - 2.在项目目录下创建 `.husky` 文件夹(其中创建一个 pre-commit hook 示例。默认，当你 commiit 会执行 npm test，可以进行修改)。同时还将 git 所在项目本地环境的 core.hookspath 设置为.husky。所以，这个.husky 目录就是我们放 git hook 脚本的地方：
  - 3.在 package.json 中添加一个脚本：

```js
...
"script":{
    "prepare": "husky install"
}
```

- 注意: 这里我们只限制 git commit 规范。所以会把 pre-commit 文件删除。

二. Add hook：使用 husky add .增加另一个钩子（`husky add <file> [cmd]`）

- 这个命令会做 2 件事：
  - 1.在 husky 增加 commit-msg 文件。
  - 2.注入命令

```ssh
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

三.卸载 husky

```bash
npm uninstall husky && git config --unset core.hooksPath
```

### 通过简单的 commit 测试 husky hook 是否生效

- 不规范的提交

```bash
git commit -m "foo: this will fail"

⧗   input: foo: this will fail
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```

- 规范的提交

```bash
git commit -m "chore: lint on commitmsg"
[main 13ec2f6] chore: lint on commitmsg
 7 files changed, 1256 insertions(+), 125 deletions(-)
 ...
```

### 友情链接

[阮一峰:Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)<br>
[Git 官方文档](https://git-scm.com/book/zh/v2)<br>
[Git hook](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
