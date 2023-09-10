# 为什么关注优先级

不同选择器组合修改同一个元素的同一个属性，谁说了算？

# 优先级顺序大原则

!important > 内联样式 > 选择器设置样式 > 浏览器默认样式 > 来自继承的样式

如果优先级完全相同，后面的覆盖前面的

# 优先级详解
## !important 和内联样式

```css
<style>  
    p {  
        color: red !important;  
    }  
    .box p {  
        color: blue;  
    }</style>  
  
<div class="box">  
    <p style="color: yellow;">Hello World</p>  
</div>
```

`<p>` 标签最终生效的是带有 `!important` 的样式，显示为红色。

## 继承的样式

下面样式，文字将展示黄色：

```css
<style>  
    .box {  
        color: red !important;  
    }  
    .box p {  
        color: blue;  
    }</style>  
  
<div class="box">  
    <p style="color: yellow;">Hello World</p>  
</div>
```

红色是 p 继承自 box 的，权重是最低的，第二是通过 `.box p` 设置的蓝色，最高的是内联设置的黄色。

下面的例子，连接将显示浏览器链接的默认颜色：

```css
<style>  
    .box {  
        color: red !important;  
    }  
    </style>  
  
<div class="box">  
    <a href="#">Hello World</a>  
</div>
```

# 权重的计算

![[Pasted image 20230910214908.png]]
