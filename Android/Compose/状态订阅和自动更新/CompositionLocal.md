# CompositionLocal 的基本使用方式

```kotlin
val LocalName = compositionLocalOf<String> { error("no value provided for name") }

// 使用 CompositionLocalProvider 传递 LocalName
CompositionLocalProvider(LocalName provides "mlya") {  
    User()  
}

@Composable  
fun User() {  
	// 这里没有通过函数参数传递，而是通过 CompositionLocal 来获取
    Text(LocalName.current)  
}
```

使用说明：

1. 使用 `compositionLocalOf` 函数创建一个 CompositionLocal 变量
	1. 因为是一个全局变量，所以首字母大写
	2. Compose 中，CompositionLocal 变量约定使用 local/Local 开头
2. 使用 `CompositionLocalProvider` 来设置 CompositionLocal 的变量
	1. `provides` 是一个 [[infix 中缀函数]]，在调用时可以不用 `.` 和 `()`
	2. `CompositionLocalProvider` 的函数参数列表中，定义了 CompositionLocal 变量在这个作用域的范围内的值

遗留的问题：

1. `compositionLocalOf` 函数的默认参数是干什么的？
2. CompositionLocal 的使用场景是什么？

## CompositionLocal 的使用场景

CompositionLocal 可以看作是一种「不用传递的函数参数」。

那么，什么场景需要使用这种「不用传递的函数参数」呢？

例如，`LocalActivity` 就是一个比较合适的使用场景，可以用来提供当前环境的 Activity。这种变量的提供，是没有歧义的。

我还能想到的一些场景有：

- 上下文、环境类型的数据
	- 例如：LocalContext
- 日志
- 应用主题 -- 亮色模式，暗色模式等 
- 灰度开关

例如，MaterialTheme 就使用了 ComposeLocal 来设置主题：

```kotlin
@Composable  
fun MaterialTheme(  
    colors: Colors = MaterialTheme.colors,  
    typography: Typography = MaterialTheme.typography,  
    shapes: Shapes = MaterialTheme.shapes,  
    content: @Composable () -> Unit  
) {  
    val rememberedColors = remember {  
        // Explicitly creating a new object here so we don't mutate the initial [colors]  
        // provided, and overwrite the values set in it.        colors.copy()  
    }.apply { updateColorsFrom(colors) }  
    val rippleIndication = rememberRipple()  
    val selectionColors = rememberTextSelectionColors(rememberedColors)  
    CompositionLocalProvider(  
        LocalColors provides rememberedColors,  
        LocalContentAlpha provides ContentAlpha.high,  
        LocalIndication provides rippleIndication,  
        LocalRippleTheme provides MaterialRippleTheme,  
        LocalShapes provides shapes,  
        LocalTextSelectionColors provides selectionColors,  
        LocalTypography provides typography  
    ) {  
        ProvideTextStyle(value = typography.body1) {  
            PlatformMaterialTheme(content)  
        }  
    }}
```

如果我们对于一个变量的诉求，是「从下向上」思考的，那么应该使用函数参数来处理；如果是「从上向下」思考的，那么可以考虑使用 CompositionLocal。

## compositionLocalOf 的默认值的用处

在理解了 CompositionLocal 的基本使用方法之后，`compositionLocalOf` 默认值的用处也就显而易见了，那就是在 CompositionLocalProvider 中没有提供对应的值时，会取到默认值。
