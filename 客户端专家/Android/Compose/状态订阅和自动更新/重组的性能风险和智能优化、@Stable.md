## 0.1 重组范围的进一步研究

### 0.1.1 inline 函数的问题

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

### 0.1.2 函数并不一定真正会被执行

看这样的代码

```kotlin
setContent {  
    Log.d(TAG, "onCreate: Recompose 范围测试：1")  
    Column {  
        Log.d(TAG, "onCreate: Recompose 范围测试：2")  
        Heavy()  
        Text(text = name, modifier = Modifier.clickable { name = "HongZheng" })  
    }  
}

@Composable  
fun Heavy() {  
    Log.d(TAG, "Heavy: ")  
    Text(text = "Heavy")  
}
```

执行后，再点击 Text，发现 Heavy 并没有被执行第二次

![[Pasted image 20230416194757.png]]

这其实有点反直觉，Heavy 明明被调用了，但是里面的代码却没有被执行。

原因其实是这样的：

1. Compose 在编译时，会被函数做一些修改，在真正调用函数内的代码时，会增加一些条件的判断
2. Heavy **没有入参**，所以内容不会改变，compose 判断该内容不会变，所以就不会重复调用

那如果给 Heavy 增加一个入参：

```kotlin
setContent {  
    Log.d(TAG, "onCreate: Recompose 范围测试：1")  
    Column {  
        Log.d(TAG, "onCreate: Recompose 范围测试：2")  
        Heavy(name)  
        Text(text = name, modifier = Modifier.clickable { name = "HongZheng" })  
    }  
}

@Composable  
fun Heavy(name: String) {  
    Log.d(TAG, "Heavy: $name")  
    Text(text = "Heavy: $name")  
}
```

再次做同样的操作，日志如下，可以发现 Heavy 被重复执行了

![[Pasted image 20230416195115.png]]

上面 Heavy 传入的还是 name 变量，如果我们使用另一个变量呢？

```kotlin
var name by mutableStateOf("Mlya")  
var name2 by mutableStateOf("XiaoYu")  
setContent {  
    Log.d(TAG, "onCreate: Recompose 范围测试：1")  
    Column {  
        Log.d(TAG, "onCreate: Recompose 范围测试：2")  
        Heavy(name2)  
        Text(text = name, modifier = Modifier.clickable { name = "HongZheng" })  
    }  
}
```

可以看出来，Heavy 不会被执行第二次了，这也可以理解，因为 name2 并没有变化。

![[Pasted image 20230416195314.png]]

## 0.2 Stable 的问题可以看：[[自定义类型]]