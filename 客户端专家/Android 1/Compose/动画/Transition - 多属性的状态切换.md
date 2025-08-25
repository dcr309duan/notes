Transition 的作用是转场动画，使用示例如下：

```kotlin
setContent {  
    var big by remember { mutableStateOf(false) }  
    val bigTransition = updateTransition(targetState = big, label = "transition")  
    val size by bigTransition.animateDp(label = "sizeTransition") {  
        if (it) 96.dp else 48.dp  
    }  
    Box(  
        Modifier  
            .size(size)  
            .background(Color.Green)  
            .clickable { big = !big })  
}
```

1. 使用 `updateTransition` 创建了一个 Transition 对象
2. 调用 `animateDp` 计算出 size 的值

实现动画。

transition 可以建立多属性的动画，即一个 transition 对应多个状态值的动画。

例如：

```kotlin
setContent {  
    var big by remember { mutableStateOf(false) }  
    val bigTransition = updateTransition(targetState = big, label = "transition")  
    val size by bigTransition.animateDp(label = "sizeTransition") {  
        if (it) 96.dp else 48.dp  
    }  
    val corner by bigTransition.animateDp(label = "cornerTransition") {  
        if (it) 0.dp else 18.dp  
    }  
    Box(  
        Modifier  
            .size(size)  
            .clip(RoundedCornerShape(corner))  
            .background(Color.Green)  
            .clickable { big = !big })  
}
```

为什么要用 transition：

- transition 的格局更大，统一管理多个动画
- 性能更好
- 更方便的 preview

![[Pasted image 20230506215620.png]]

- rememberInfiniteTransition