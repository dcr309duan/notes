# Block 参数

animateTo 和 animateDecay 函数中，都有一个 Block 的参数：

```kotlin
suspend fun animateDecay(  
    initialVelocity: T,  
    animationSpec: DecayAnimationSpec<T>,  
    block: (Animatable<T, V>.() -> Unit)? = null  
)

suspend fun animateTo(  
    targetValue: T,  
    animationSpec: AnimationSpec<T> = defaultSpringSpec,  
    initialVelocity: T = velocity,  
    block: (Animatable<T, V>.() -> Unit)? = null  
)
```

block 是一个函数类型，用于监听每一帧动画

```kotlin
val anim = remember {  
	Animatable(0.dp, Dp.VectorConverter)  
}  
var padding2 by remember { mutableStateOf(anim.value) }  

val decay = remember { exponentialDecay<Dp>() }  
LaunchedEffect(Unit) {  
	delay(1000)  
	anim.animateDecay(1000.dp, decay) {  
		padding2 = value  
	}  
}

Row {  
    Box(  
        modifier = Modifier  
            .padding(0.dp, anim.value, 0.dp, 0.dp)  
            .size(100.dp)  
            .background(Color.Green)  
    )  
    Box(  
        modifier = Modifier  
            .padding(0.dp, padding2, 0.dp, 0.dp)  
            .size(100.dp)  
            .background(Color.Red)  
    )}
```

通过上面的代码，实现了两个 box 会同时前进的效果。