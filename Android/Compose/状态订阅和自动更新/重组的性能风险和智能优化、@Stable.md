## 重组范围的进一步研究

### inline 函数的问题

我们之前了解过，我们状态变化后，使用状态所在的作用域函数会重新执行。

但是我们观察如下代码：

```kotlin
setContent {  
    Log.d(TAG, "onCreate: Recompose 范围测试：1")  
    Column {  
        Log.d(TAG, "onCreate: Recompose 范围测试：2")  
        Text(text = name, modifier = Modifier.clickable { name = "HongZheng" })  
    }  
}
```

执行后，点击 Text，发现两句 log 仍然都会被打印：

![[Pasted image 20230416193207.png]]

原因是因为 Column 是内联函数：

![[Pasted image 20230416193320.png]]

所以在运行时，虽然 name 是在 Column 内部代码块读取的，但是整个 setContent 范围的代码都会被执行。

**这就可能造成性能风险！！**

### 函数并不一定真正会被执行

