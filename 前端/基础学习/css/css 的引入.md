# link 标签引入 css 文件

可以通过这样的方式引入 css 文件，放在 head 标签内：
```html
<link href="css/style.css" rel="stylesheet">
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/style.css" rel="stylesheet">
  </head>
  <body>
  
  </body>
</html>
```

# 通过 style 标签引入

```html
<style>
h1 {
  font-size: 81px;
}
</style>
```

# 通过 css 的 import 引入

可以在一个 css 文件中引入另一个 css 文件：

```html
@import url(main.css);
```

通过这种方式，import 必须放在文件的开头。

## link 和 import 的区别

- link 是 html 标签，可以通过 js 去找到这个元素并进行修改, import 是 css 语法，无法通过 js 去修改
- 多个 link 标签引入 css，是并行加载的；而 import 需要串行加载两个文件

# 使用 style 属性修改标签样式

```html
<p style="color: green; border: 1px solid"> Hello p</p>
```

一般不去直接修改单个标签的 style 样式，但是可以用 js 去动态修改标签样式。

