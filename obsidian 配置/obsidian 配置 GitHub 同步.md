## 为什么使用 GitHub 同步

obsidian 的同步方案比较

| 方案名称                                                 | 优点                                                  | 缺点                          |
| -------------------------------------------------------- | ----------------------------------------------------- | ----------------------------- |
| 官方同步方案                                             | 简单，稳定                                            | 贵                            |
| [Remotely Save](obsidian://show-plugin?id=remotely-save) | 可以用于网盘同步，例如 OneDrive                       | 网盘也要付费                  |
| [obsidian-git](obsidian://show-plugin?id=obsidian-git)   | 使用 git 进行同步，可以使用 GitHub、GitLab 等进行同步；还可以使用不同的分支进行版本管理 | 最好还是需要一点对 git 的了解 |


这里使用 [obsidian-git](obsidian://show-plugin?id=obsidian-git) 进行管理，主要有以下几点考量：

1. 早就习惯了 git、GitHub 的使用，这方面没有使用门槛
2. GitHub 仓库免费使用，而且方便迁移
3. 可以使用不同的分支进行管理，例如，一个草稿分支，一个正式分支，草稿分支写差不多了之后，merge 到正式分支
4.  [obsidian-git](obsidian://show-plugin?id=obsidian-git) 插件已经很好的支持了，可以无感操作

## 配置

### 插件安装

obsidian 配置 github 自动同步，需要使用 [obsidian-git](obsidian://show-plugin?id=obsidian-git) 插件，首先进行插件的安装，这个直接在 obsidian 的插件配置中心下载安装即可。

### 配置 git 仓库

#### 创建 git 本地仓库

obsidian 默认没有创建 git 仓库，需要我们自己创建一下 git 仓库

1. 找到 obsidian 的 vault 目录
2. 然后 `git init` 创建 git 仓库

#### 创建 GitHub 仓库

我们在 GitHub 上创建一个新仓库，这里就不详细介绍了

#### 设置 git 远程同步源

使用 `git remote` 命令设置同步地址：

```zsh
git remote add origin git@github.com:dcr309duan/notes.git
```

将 main 分支绑定到远程分支

```zsh
git branch --set-upstream-to=origin/main main
```

推送到远程仓库

```zsh
git push
```

### 插件设置

我这里进行了其中的几项设置，如下图：

![[Pasted image 20230415215425.png]]![[Pasted image 20230415215502.png]]