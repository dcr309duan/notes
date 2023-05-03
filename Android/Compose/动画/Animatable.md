AnimateAsState 内部，最终使用的就是 `Animatable`
![[Pasted image 20230503130656.png]]

```kotlin
fun Animatable(  
    initialValue: Float,  
    visibilityThreshold: Float = Spring.DefaultDisplacementThreshold  
) = Animatable(  
    initialValue,  
    Float.VectorConverter,  
    visibilityThreshold  
)
```

