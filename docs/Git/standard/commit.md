---
title: git commit
author: 向阳
date: 2023-03-27
---

## git commit 规范

### 前言

当前环境

> Node 版本: v14.18.2；npm 版本: 6.14.15

什么是 Commit message

```bash
# Git 每次提交代码，都要写 Commit message（提交说明），否则就不允许提交。下面代码的-m参数，就是用来指定 commit mesage 的。
git commit -m "hello world"
```

为什么要有 Commit message 规范，以及怎么去做好规范

> 通常我们的 git commit 会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。如果每次手动来编写这些是比较麻烦的事情，我们可以使用工具。<br>
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

1. 安装 Commitizen CLI（the command line tool）

```bash
# 如果安装在本地项目，用npx cz 代替git commit
npm install commitizen -D

#如果安装在全局，可以用git cz 代替git commit
npm install commitize -g
```

- 执行一下命令，可以发现执行效果和 `git commit`一致。其实 `commitizen` 一般使用需要配合对应的规则模块，通过规则模块规则化 commit 信息。官方和社区提供了预设的规则包:`cz-conventional-changelog`

```bash
dameizi@dameizideMacBook-Pro testcommit % git commitnpx cz
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Changes to be committed:
#       new file:   2.js
#
...
```

2. 安装 cz-conventional-changelog，并且初始化 cz-conventional-changelog：

```bash
# --save-exact的作用就是固定依赖包的版本，不要带^或~，避免出现小版本。
# 但是!!发现这行命令执行后，安装下来的依赖包还是带了^。所以如果真的想要固定这个依赖包版本，可以分两步执行，参考下方补充
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

- 这个命令除了会帮助我们安装 cz-conventional-changelog，还会在 package.json 中进行如下配置：

```js
/*这只是告诉Commitizen，当尝试提交时，我们实际上希望他们使用哪个适配器。*/
"config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
}
```

- 补充: 如果想要固定这个依赖包版本，还是老老实实分两步执行:

```bash
# 等安装完后再执行初始化命令
npm install cz-conventional-changelog --save-dev --save-exact
npx commitizen init cz-conventional-changelog

# 效果
...
"devDependencies": {
  "commitizen": "^4.3.0",
  "cz-conventional-changelog": "3.3.0"
 }
```

#### 使用

1. 执行`git add .`后，使用`npx cz`代替`git commit`命令。如果是全局安装了 commitizen，可以用`git cz`命令:

```js
//也可以在scripts中进行如下配置后，使用 npm run commit。
...
"scripts":{
    "commit":"cz"
}
```

- 回车后，第一步是选择 type，本次更新的类型：

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

- 第三步是 subject，输入 commit 目的的简要描述：

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

- 在未跳过所有选项情况下的效果：

```bash
docs(commit.md): edit commit.md
commit.md need to update

BREAKING CHANGE: test break change to be changed y

fix #pretend to exist an open issue，and solved it just now
```

#### 代码提交验证

如果我们按照 cz 来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？我们可以通过 commitlint（[github 链接](https://github.com/conventional-changelog/commitlint)、[文档链接](https://commitlint.js.org/#/guides-local-setup)）来限制提交。

1.安装 @commitlint/config-conventional 和 @commitlint/cli。

```bash
# Install and configure if needed
npm install --save-dev @commitlint/{cli,config-conventional}

# For Windows:
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

2.配置 commitlint

```bash
# Configure commitlint to use conventional config（自动）
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

#或者 手动定义一个文件配置并注入如下代码，文件名可取 commitlint.config.js, .commitlintrc.js, .commitlintrc, .commitlintrc.json, .commitlintrc.yml ，也可以在package.json中使用 commitlint字段配置。
module.exports = {
  extends: ['@commitlint/config-conventional']
}1
```

3.使用 husky 生成 commit-msg 文件，验证提交信息：（输入命令前，请先阅读下面的 husky 工具了解）

- `npx --no-install` 表示只使用本地依赖，不允许找不到的时候尝试去下载，如果本地没有依赖包的话，就会报错。
- `commitlint --edit <文件名>`：执行 commitlint 命令行工具，并使用 --edit 选项。表示从一个文件里提取 commit 内容来进行校验，校验规则由前面说的 commitlint.config.js 配置文件来指定。这里的`$1` 指向的是 `.git/COMMIT_EDITMSG` 文件，该文件保存着最后一次提交的 commit 信息。

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

- 补充：--edit 是 commitlint 的命令，可以在控制台输入`npx commitlint -h`查看 commitlint CLI 的具体用法。
  - 可以方便查询到：--edit 是 从定义的文件名或者从'./.git/COMMIT_EDITMSG'中读取最近一次的提交信息。即`--edit abc`就会从`当前项目根目录/abc`中去读取，如果这个文件不存在，就会报错。

```bash
dameizi@dameizideMacBook-Pro vuepress-starter % npx commitlint -h
@commitlint/cli@17.5.0 - Lint your commit messages

[input] reads from stdin if --edit, --env, --from and --to are omitted

选项：
  -c, --color          toggle colored output               [布尔] [默认值: true]
  -g, --config         path to the config file                          [字符串]
      --print-config   print resolved config              [布尔] [默认值: false]
  -d, --cwd            directory to execute in
                                          [字符串] [默认值: (Working Directory)]
  -e, --edit           read last commit message from the specified file or
                       fallbacks to ./.git/COMMIT_EDITMSG               [字符串]
  -E, --env            check message in the file at path given by environment
                       variable value                                   [字符串]
  -x, --extends        array of shareable configurations to extend        [数组]
  -H, --help-url       help url in error message                        [字符串]
  -f, --from           lower end of the commit range to lint; applies if
                       edit=false                                       [字符串]
      --git-log-args   addditional git log arguments as space separated string,
                       example '--first-parent --cherry-pick'           [字符串]
  -o, --format         output format of the results                     [字符串]
  -p, --parser-preset  configuration preset to use for
                       conventional-commits-parser                      [字符串]
  -q, --quiet          toggle console output              [布尔] [默认值: false]
  -t, --to             upper end of the commit range to lint; applies if
                       edit=false                                       [字符串]
  -V, --verbose        enable verbose output for reports without problems [布尔]
  -s, --strict         enable strict mode; result code 2 for warnings, 3 for
                       errors                                             [布尔]
  -v, --version        display version information                        [布尔]
  -h, --help           显示帮助信息
```

### husky 工具了解

> [husky](https://typicode.github.io/husky/#/?id=articles) 是一个 [git hook](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90) 工具，可以帮助我们触发 git 提交的各个阶段如：pre-commit、commit-msg、pre-push

#### 使用

一. 配置

使用自动配置命令(推荐)

```bash
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2+
pnpm dlx husky-init && pnpm install # pnpm
```

- 这个命令会做 3 件事:

  - 1.安装 husky 相关的依赖。
  - 2.启用 git hook 以及 创建了一个 pre-commit hook 示例。

    - 在项目根目录下创建 `.husky` 文件夹（其中创建了一个可以修改的 pre-commit hook 示例。默认，当 commit 时会先执行 npm test，即在 commit 前先过一过测试用例）。

    ```bash
    # 生成的.husky文件夹
    .husky
    ├── _
    │   ├── .gitignore
    │   └── husky.sh
    └── pre-commit
    ```

    - 同时还将 git 所在项目本地环境的 core.hookspath 设置为.husky。所以，现在这个.husky 目录就是我们放 git hook 脚本的地方。

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

也可以使用手动配置完成自动配置中的操作

- 1.安装 husky 相关的依赖

```bash
npm install husky --save-dev
```

- 2.启用 Git hooks

```bash
npx husky install

# 生成的根目录下的.husky文件夹
.husky
└── _
    ├── .gitignore
    └── husky.sh

```

- 3.在 package.json 中添加一个脚本：

```bash
# 可以使用命令添加。注意[npm pkg](https://docs.npmjs.com/cli/v7/commands?v=true) 命令在 npm Version 7.24.2 及以上才有
npm pkg set scripts.prepare="husky install"

# 添加的脚本
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

二. Add hook：使用 husky add .增加一个钩子（`husky add <file> [cmd]`）

- 这个命令会做 2 件事：
  - 1.在 .husky 目录 增加 `<file>` 文件。
  - 2.注入`cmd`命令

```bash
# 如：执行这行命令后会在.husky目录增加pre-commit文件，创建的脚本内容如下:
npx husky add .husky/pre-commit "npm test"
```

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test
```

- 测试 git commit

```bash
# 如果 npm test命令失败，你的commit将会被自动终止。
git add .husky/pre-commit
git commit -m "Keep calm and commit"
```

- 注意：使用命令创建，这个脚本会自动设置为可执行。但如果你是手动创建的，你需要手动使用 `chmod u+x pre-commit` 命令将该文件设置为可执行文件，否则钩子脚本是不会执行的。

```bash
#手动创建的时候，commit前会出现如下警告
hint: The '.husky/commit-msg' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`.

# 所以你需要进入.husky目录，然后使用以下命令，将脚本设置为可执行
chmod u+x pre-commit
```

三.卸载 husky

```bash
# --unset 移除键值对，只有键时，将会删除该键值对，键后跟值时，代表仅删除改值。即移除了husky的git-hook 的配置权限。
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

#### 认识 git hook

- 作用:
  - git hook 让我们可以在 git 执行一些行为的前后时机，执行一些自定义脚本。<br>
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
