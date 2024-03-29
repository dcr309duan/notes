# 块级标签

## 页面框架

- `<div>`: 层级分块，逻辑上的分块都可以使用 div
- `<h1> ~ <h6>`: 表示标题
- `<p>`: 表示段落
- `<header>`: 页面的唯一头部
- `<footer>`: 页面的尾部
- `<main>`: 页面主体
- `<aside>`: 页面上的侧边栏
- `<section>`: 文章的一个章节或者页面的一个部分
- `<article>`: 文章
- `<nav>`: 页面导航栏，里面是超链接

## 列表

### 无序列表

- `<ul>`: 列表本身，直接 child 必须是 `<li>`
- `<li>`: 每个 item

### 有序列表

- `<ol>`: 有序列表
- `<li>`: 每个 item

# 行标签

## `<a>` 标签

链接跳转：

```html
<a href="https://www.jirengu.com" target="_blank" title="跳转到饥人谷">饥人谷</a>  
<a href="https://www.baidu.com" target="_self">百度</a>
```

## `<img>` 标签

图片展示：

```html
<img src="图片地址" alt="报错信息">
```

## `<span>` 标签

对一行内容中的某一块内容做特殊处理

# 块标签和行标签的区别

块标签是换行排列的，行标签是水平排列的。
块级元素，一般可以嵌套块元素和行元素。
行标签一般只能嵌套行标签。