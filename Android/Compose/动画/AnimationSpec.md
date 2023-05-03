# SpringSpec
animateTo 默认使用了一个 SpringSpec：
![[Pasted image 20230503151227.png]]
默认使用的是没有回弹效果：
![[Pasted image 20230503151328.png]]
我们可以进行指定：

```kotlin
anim.animateTo(size, spring(Spring.DampingRatioMediumBouncy))
```

AnimationSpec 继承树：
![[Pasted image 20230503151950.png]]
![[Pasted image 20230503152024.png]]
![[Pasted image 20230503152039.png]]
![[Pasted image 20230503152052.png]]
![[Pasted image 20230503152109.png]]
# TweenSpec

```kotlin
@Immutable  
class TweenSpec<T>(  
    val durationMillis: Int = DefaultDurationMillis,  
    val delay: Int = 0,  
    val easing: Easing = FastOutSlowInEasing  
)
```

1. durationMillis: 延迟时间
2. delay: 延迟启动时间，默认为 0
3. easing: 缓动方式

## easing

有四种缓动方式，默认为 `FastOutSlowInEasing`
![[Pasted image 20230503153808.png]]
- FastOutSlowInEasing
- LinearOutSlowInEasing
- FastOutLinearInEasing
- LinearEasing

### 自定义 Easing

例如，匀速动画：

```kotlin
offsetAnim.animateTo(offset, TweenSpec(easing = { it }))
```

动画完成度 **等于** 时间完成度，直接返回了 `it`

一般我们不需要自定义 Easing

### 贝塞尔曲线完成动画

