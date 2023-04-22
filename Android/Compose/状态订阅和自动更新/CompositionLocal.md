# 什么是 CompositionLocal？


- CompositionLocal 一般以 Local/local 打头

# CompositionLocal 的基本使用方式

```kotlin
val LocalName = compositionLocalOf<String> { error("no value provided for name") }

// 使用 CompositionLocalProvider 传递 LocalName
CompositionLocalProvider(LocalName provides "mlya") {  
    User()  
}

@Composable  
fun User() {  
	// 这里没有通过函数参数传递，而是
    Text(LocalName.current)  
}
```

