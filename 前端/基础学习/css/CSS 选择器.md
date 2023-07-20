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
