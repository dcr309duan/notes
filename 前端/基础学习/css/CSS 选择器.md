# 标签选择器

- 全局生效，覆盖范围广，尽量少直接使用
- 一般用于覆盖标签的默认样式

例如，body 默认由 8px 的 margin，有时候我们需要去掉

![[Pasted image 20230720224320.png]]

```css
/* body 去掉默认的 margin */
body {  
	margin: 0;  
}

/* a 标签去掉下划线*/
a {  
	text-decoration: none;  
}
```

# id 选择器

使用 `#` 选择，用于选中一个拥有特定 id 的元素

```css
#header {
	
}
```

# class 选择器

使用 `.` 选择，用于选中一组拥有特定 class 的元素

```css
.active {

}
```

# 伪类选择器

使用 `:` 选择，用于选择处于特定状态的元素

当鼠标放上去时的效果：

```css
a:hover {  
	color: red;  
}
```

# 伪元素选择器

使用 `::` 选择，给元素内部添加内容，`::before` 在前面添加，`::after` 在后面添加。

```css
.icon-check::before {
	content: '✅';
}
<span class="icon-check">你好</span>
```

# 属性选择器

`[attr]` 选择包含 attr 属性的所有元素
`[attr=value]` 仅选择 attr 属性被赋值为 val 的所有元素

```css
[disabled] {

}

[title="mlya"] {

}
```

# 通配选择器

匹配所有元素：

```css
* {

}

/*给 box 的所有 child 设置样式*/
.box * {

}
```

# 组合选择器

## `A B`

- A 和 B 分别代表任一种单一选择器，A 和 B 之间有空格
- `A B` 代表内部的所有的 B

下面的 css，会选中 class 为 menu 下的 class 为 item 的元素：

```css
.menu .item {
	border: 1px solid red;
}
```

## `A>B`

代表 A 的直接子元素 B

```css
.menu>.item {
	border: 1px solid red;
}
```

直接写 `A B`，会选中 A 内的所有 B 的元素。

而 `A>B`，只有 A 的直接子元素会被选中

## `AB`

代表，既是 A，又是 B 的元素

```css
.item.active {
	color: red;
}
```


## `A,B`

代表，分别选中 A 和 B

```css
.title, .detail {
	font-size: 20px;
}

.detail {
	color: grey;
}
```