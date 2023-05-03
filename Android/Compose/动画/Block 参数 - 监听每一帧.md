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

