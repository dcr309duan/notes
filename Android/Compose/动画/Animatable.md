AnimateAsState 内部，最终使用的就是 `Animatable`
![[Pasted image 20230503130656.png]]

Animatable 的构造函数如下：

```kotlin
class Animatable<T, V : AnimationVector>(  
    initialValue: T,
    val typeConverter: TwoWayConverter<T, V>,
    private val visibilityThreshold: T? = null,  
    val label: String = "Animatable"  
)
```

Animatable 是有泛型参数的：

- `T` 表示输入的值类型，也就是 initialValue 的类型
- `V` 表示转换成的动画向量值，是 Compose 动画内部使用的类型
- 为了将 `T` 和 `V` 两种类型的值进行相互转换，需要 `typeConverter` 这个参数

例如，dp 可以使用 `Dp.VectorConverter` 这个 converter

```kotlin
Animatable(8.dp, Dp.VectorConverter)
```