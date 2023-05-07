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

