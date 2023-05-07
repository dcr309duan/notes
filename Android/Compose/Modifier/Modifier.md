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

这里首先调用了 `Modifier.then` 方法，`then` 方法的参数为另一个 Modifier，这个方法的作用是，将两个 Modifier 进行合并。

在伴生对象中，对 `then` 方法进行了重写：

```kotlin
companion object : Modifier {  
    override infix fun then(other: Modifier): Modifier = other  
}
```

这个实现非常简单，直接返回了参数传入的 Modifier 作为合并后的 Modifier。

`then` 方法的默认实现：

```kotlin
infix fun then(other: Modifier): Modifier =  
    if (other === Modifier) this else CombinedModifier(this, other)
```

如果传入的 Modifier 为 `Modifier` 伴生对象，则返回调用者作为合并后的 Modifier。

否则，创建一个 `CombinedModifier` 作为合并后的 Modifier：

```kotlin
class CombinedModifier(  
    internal val outer: Modifier,  
    internal val inner: Modifier  
) : Modifier {  
    override fun <R> foldIn(initial: R, operation: (R, Modifier.Element) -> R): R =  
        inner.foldIn(outer.foldIn(initial, operation), operation)  
  
    override fun <R> foldOut(initial: R, operation: (Modifier.Element, R) -> R): R =  
        outer.foldOut(inner.foldOut(initial, operation), operation)  
  
    override fun any(predicate: (Modifier.Element) -> Boolean): Boolean =  
        outer.any(predicate) || inner.any(predicate)  
  
    override fun all(predicate: (Modifier.Element) -> Boolean): Boolean =  
        outer.all(predicate) && inner.all(predicate)  
  
    override fun equals(other: Any?): Boolean =  
        other is CombinedModifier && outer == other.outer && inner == other.inner  
  
    override fun hashCode(): Int = outer.hashCode() + 31 * inner.hashCode()  
  
    override fun toString() = "[" + foldIn("") { acc, element ->  
        if (acc.isEmpty()) element.toString() else "$acc, $element"  
    } + "]"  
}
```

CombinedModifier 实现了 `Modifier` 接口。

这里就需要理解一下 `foldIn`, `foldOut`, `any` 和 `all` 这四个方法的含义了。

### foldIn & foldOut