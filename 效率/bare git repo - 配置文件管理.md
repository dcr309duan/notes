# 资料

- [Stow | 简单好用的配置管理工具](https://www.bilibili.com/video/BV18u41167xT/)
- [bare git repo](https://www.atlassian.com/git/tutorials/dotfiles)

# 如何使用

首先，我们创建一个 git 仓库，但是这个 git 仓库不指向一个目录，而是指向一个配置文件：

```bassh
git init --bare $HOME/.cfg
```

然后，我们在使用的时候，可以使用如下命令来访问这个 git 仓库：

```bash
git --git-dir=$HOME/.cfg/ --work-tree=$HOME
```

为了方便使用，我们可以定义一个别名：

```bash
alias config='/usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME'
```

那么，我们使用 `config` 就可以了，例如：

```bash
config status 
config add .vimrc 
config commit -m "Add vimrc" 
config add .bashrc 
config commit -m "Add bashrc" 
config push
```

当我们在另一台设备上需要同步配置文件时，可以用如下方式：

```bash
git clone --bare <git-repo-url> $HOME/.cfg
```

