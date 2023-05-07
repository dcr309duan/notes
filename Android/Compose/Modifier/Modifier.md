## Modifier 接口和伴生对象

Modifier 是一个 interface 接口，在接口中，同时也定义了 `companion object` 的对象。

```kotlin
interface Modifier {
	// xxx
	// ...

	companion object : Modifier {  
	    override fun <R> foldIn(initial: R, operation: (R, Element) -> R): R = initial  
	    override fun <R> foldOut(initial: R, operation: (Element, R) -> R): R = initial  
	    override fun any(predicate: (Element) -> Boolean): Boolean = false  
	    override fun all(predicate: (Element) -> Boolean): Boolean = true  
	    override infix fun then(other: Modifier): Modifier = other  
	    override fun toString() = "Modifier"  
	}
}
```

## Modifier 的连接

以 `Modifier.background()` 为例：

```kotlin
fun Modifier.background(  
    color: Color,  
    shape: Shape = RectangleShape  
) = this.then(  
    Background(  
        color = color,  
        shape = shape,  
        inspectorInfo = debugInspectorInfo {  
            name = "background"  
            value = color  
            properties["color"] = color  
            properties["shape"] = shape  
        }  
    )  
)
```

这里首先调用了 `Modifier.then` 方法，`then` 函数的参数为另一个 Modifier，这个方法的作用是，将两个 Modifier 进行合并。



