## 先从一个问题引入

分析如下代码，定义了一个变量 `name`，然后在一个协程里，三秒后修改 name 的值

```kotlin
class MutableStateActivity : ComponentActivity() {  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        setContent {  
            var name by mutableStateOf("mlya")  
            Text(text = name)  
​  
            lifecycleScope.launch {  
                delay(3000)  
                name = "HongZheng"  
            }  
        }  
    }  
}
```

运行上面的代码，界面并没有如我们所期望的在 3 秒后显示「HongZheng」，而是依然显示的「mlya」

原因是，在 recompose 时，会重新执行 `setContent` 大括号内的所有代码，这会导致两个后果：

1.  虽然 3 秒后，将 name 赋值为 “HongZheng”，但是触发重组后，会重新初始化 name 为 “mlya”
    
2.  协程也会被重复执行，没三秒就会执行一次上面的代码
    

### 如何解决？使用 remember

![[Android/Compose/attachments/image-20230415194648194.png]]

上面代码虽然能编译过，但是 IDE 其实会给标红给我们提示，让我们使用 remember 进行包裹，使用这样的方式定义：

```kotlin
var name by remember { mutableStateOf("mlya") }
```

## 知识点：remember

### 作用

remember 起到缓存作用，只在第一次调用时会进行初始化。

### 什么时候可以使用

`remember` 函数有 `@Composable` 注解，所以需要在 Composable 环境中使用

### 什么时候应该使用

我们的代码，不确定会在什么地方调用，所以，只要在 Composable 函数中定义 mutableState，就应该使用 remember 进行包裹

### 带参数的使用

看如下代码的实现：

```kotlin
@Composable  
fun ShowCharCount(value: String) {  
    val length = remember(value) {  
        value.length  
    }  
  
    Text(text = "字符串的长度是：$length")  
}
```

1. 这是一个 Composable 函数，所以可能会被频繁调用
2. 这里对入参 `value` 计算了其长度，这个操作不耗时，但是这里可能会做网络请求等耗时操作
3. 所以我们为了避免频繁进行计算长度的操作，使用了 `remember`
4. 但是，只使用 `remember` 还不够，因为会导致 value 值变化的时候，不会重新计算
5. 所以，这里在调用 remember 时，将 `value` 作为参数 `key` 传入，这样，在 key 发生变化时，会重新计算 length 的值，满足了我们的诉求

