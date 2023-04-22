## derivedStateOf 使用示例

```kotlin
@Composable
fun TodoList(highPriorityKeywords: List<String> = listOf("Review", "Unblock", "Compose")) {

    val todoTasks = remember { mutableStateListOf<String>() }

    // Calculate high priority tasks only when the todoTasks or highPriorityKeywords
    // change, not on every recomposition
    val highPriorityTasks by remember(highPriorityKeywords) {
        derivedStateOf {
            todoTasks.filter { task ->
                highPriorityKeywords.any { keyword ->
                    task.contains(keyword)
                }
            }
        }
    }

    Box(Modifier.fillMaxSize()) {
        LazyColumn {
            items(highPriorityTasks) { /* ... */ }
            items(todoTasks) { /* ... */ }
        }
        /* Rest of the UI where users can add elements to the list */
    }
}
```

上面是官方给的示例，解释如下：

1. 包含了两个 State，一个是 todoTasks，一个是 highPriorityTasks
2. hightPriorityTasks 是从 todoTasks 生成出来的
3. derivedStateOf 的作用是，在其依赖的其他状态变化的时候，执行大括号中的代码
4. 大括号中代码执行后，如果 highPriorityTasks 内容发生了变化，则会通知读过 highPriorityTasks 的 Composable 函数标记为失效，在后面进行重组
5. remember 函数传入了 highPriorityKeywords 对象，表示当下次调用 TodoList 函数时，如果是另一个 highPriorityKeywords 对象，也会执行 remember 大括号内的代码


derivedStateOf 是用于处理两个状态变量相互依赖的场景的。被依赖的状态变量变化的时候，

## derivedStateOf 使用场景

### 使用场景分析

下面是一个使用场景：

1. 两个状态，一个是 name，另一个是 processedName
2. processedName 是 name 通过 derivedStateOf 生成的

```kotlin
var name by remember {  
    mutableStateOf("mlya")  
}  
val processedName by remember {  
    derivedStateOf { name.uppercase() }  
}  
  
Column {  
    Text(text = processedName)  
    Button(onClick = { name = "hongzheng" }) {  
        Text(text = "将 name 改为 hongzheng")  
    }  
}
```

另一种写法是，也能实现同样的效果：

```kotlin
var name by remember {  
    mutableStateOf("mlya")  
}  
val processedName = remember(name) {  
    name.uppercase()  
}  
  
Column {  
    Text(text = processedName)  
    Button(onClick = { name = "hongzheng" }) {  
        Text(text = "将 name 改为 hongzheng")  
    }  
}
```

### 区别分析

1. 第一种写法，processedName 是一个 State，第二种写法，processedName 就是一个普通变量
2. 第二种写法，remember 增加了一个参数，作用是，当 name 变化时，重新计算 processedName
3. 第一种写法 remember 没有参数，processedName 的代码中，不会重复执行 `derivedStateOf {}` 这段代码，但是会执行 `derivedStateOf` 的大括号内部的代码，获取到新值，更新 processedName 这个状态

上面暂时看不出两种方式的区别，我们看下面的代码：

```kotlin
val names = remember {  
    mutableStateListOf("mlya")  
}  

// 1
val processedNames = remember(names) {  
	// 2
    names.map { it.uppercase() }  
}  
  
Column {  
    for (processedName in processedNames) {  
        Text(text = processedName)  
    }  
    Text(text = "增加一个内容", Modifier.clickable {  
        names.add("hongzheng")  
    })  
}
```

上面的这段代码，执行的时候就有问题了，点击了之后，并不会刷新 UI。分析如下：

1. names 增加了一个对象，读 names 的地方就会重复执行，也就是上面的这段代码会重新执行
2. 但是，在 `1` 这处代码执行时，因为 names 是同一个对象，所以所以不会执行 `2` 这里的代码
3. 导致后面 recompose 时，processedName 的值还是同样的值，界面不会刷新

改成如下方式：

```kotlin
val names = remember { mutableStateListOf("mlya") }  
  
val processedNames by remember(names) { derivedStateOf { names.map { it.uppercase() } } }  
  
Column {  
    for (processedName in processedNames) {  
        Text(text = processedName)  
    }    Text(text = "增加一个内容", Modifier.clickable {  
        names.add("hongzheng")  
    })  
}
```

1. processedName 使用 `by derivedStateOf` 来实现，注意这里使用的是 by 关键字做了动态代理
2. 