AnimatedVisibility 有一个参数，表示组件显示还是消失，内部内容就会受这个变量的控制，按照动画的方式显示和消失

```kotlin
Column {  
    var shown by remember {  
        mutableStateOf(true)  
    }  
    AnimatedVisibility(visible = shown) {  
        TransitionSquare()  
    }  
    Button(onClick = { shown = !shown }) {  
        Text(text = "切换")  
    }  
}
```

TransitionData 有四种动画方式：

- fade
- slide
- changeSize
- scale

```kotlin
@Immutable  
internal data class TransitionData(  
    val fade: Fade? = null,  
    val slide: Slide? = null,  
    val changeSize: ChangeSize? = null,  
    val scale: Scale? = null  
)
```

## slideIn

```kotlin
fun slideIn(  
    animationSpec: FiniteAnimationSpec<IntOffset> =  
        spring(  
            stiffness = Spring.StiffnessMediumLow,  
            visibilityThreshold = IntOffset.VisibilityThreshold  
        ),  
    initialOffset: (fullSize: IntSize) -> IntOffset,  
)
```

- initialOffset 指定初始时的偏移量，通过一个 lambda 指定
- lambda 的参数为组件自己的 size
- 例如，如果我们想，让组件从左上角滑入，可以这样写：`slideIn { IntOffset(-it.width, -it.height) }`

## expandIn

逐渐扩展的动画

- expendFrom: 从什么地方开始扩展
- initialSize: 初始的大小


## EnterTransition 的 plus 函数

```kotlin
@Stable  
operator fun plus(enter: EnterTransition): EnterTransition {  
    return EnterTransitionImpl(  
        TransitionData(  
            fade = data.fade ?: enter.data.fade,  
            slide = data.slide ?: enter.data.slide,  
            changeSize = data.changeSize ?: enter.data.changeSize,  
            scale = data.scale ?: enter.data.scale  
        )  
    )
}
```

## Transition + AnimatedVisibility

