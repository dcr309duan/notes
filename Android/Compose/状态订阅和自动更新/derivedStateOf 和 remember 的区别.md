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

