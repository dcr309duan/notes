# 安装

[LunarVim 官网](https://www.lunarvim.org/docs/installation)

## 首次安装

可以执行如下代码完成安装：

```bash
LV_BRANCH='release-1.3/neovim-0.9' bash <(curl -s https://raw.githubusercontent.com/LunarVim/LunarVim/release-1.3/neovim-0.9/utils/installer/install.sh)
```

注意事项：

1. 需要挂代理安装，不然执行上面脚本后无法安装，并且没有提示
2. 执行过程中，会安装 python、rust、nodejs 等插件，需要输入 `y` 进行确认

## 更新 LunarVim

更新 LunarVim 有两种方式，一种是在 LunarVim 内部，执行如下命令：

```bash
:LvimUpdate
```

另一个方式是在 shell 的命令行中执行：

```bash
lvim +LvimUpdate +q
```

更新 Lvim 插件，需要在 Lvim 中，执行：

```bash
:LvimSyncCorePlugins
```

# 快捷键

* *[LunarVim 快捷键](https://www.lunarvim.org/docs/beginners-guide/keybinds-overview)
* [vim 快捷键](https://devhints.io/vim)
* 