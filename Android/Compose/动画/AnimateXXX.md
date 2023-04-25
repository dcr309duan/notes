# AnimateDpAsState

```kotlin
var big by mutableStateOf(false)  
setContent {  
    val size by animateDpAsState(targetValue = if (big) 96.dp else 48.dp)  
  
    Log.d(TAG, "onCreate: size = $size")  
    Box(modifier = Modifier  
        .size(size = size)  
        .background(Color.Green)  
        .clickable {  
            big = !big  
        })  
}
```

1. animateDpAsState 返回的是一个 `State` 对象，而不是 `mutableState` 对象
	1. ![[Pasted image 20230424224942.png]]
2. animateDpAsState 内隐含了 remember 的逻辑，之后在第一次执行时创建 State 对象
3. animateDpAsState 是一个 Composable 函数，内部读 big 变量，会跟其他 composable 一样，进行 big 变量的监听，big 变化时，会触发 recompose
4. recompose 时，虽然不会重复创建 State 值，但是会重新计算 targetValue 值
5. 内部会启动一个协程，以渐变的方式修改 State 的值，通知对应的 UI 去触发 recompose 进行更新


## 缺陷

这种动画实现不够灵活，无法对动画做出太详细的定制。

灵活的动画定制，可以使用 [[Animatable]]