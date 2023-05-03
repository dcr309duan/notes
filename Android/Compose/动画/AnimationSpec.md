# AnimationSpec 继承树
![[Pasted image 20230503151950.png]]
![[Pasted image 20230503152024.png]]
![[Pasted image 20230503152039.png]]
![[Pasted image 20230503152052.png]]
![[Pasted image 20230503152109.png]]
# DurationBasedAnimationSpec


animateTo 默认使用了一个 SpringSpec：
![[Pasted image 20230503151227.png]]
默认使用的是没有回弹效果：
![[Pasted image 20230503151328.png]]
我们可以进行指定：

```kotlin
anim.animateTo(size, spring(Spring.DampingRatioMediumBouncy))
```

## TweenSpec

Tween 可以理解为补间动画，表示起点和终点之间如何填充动画。

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

### easing

有四种缓动方式，默认为 `FastOutSlowInEasing`
![[Pasted image 20230503153808.png]]
- FastOutSlowInEasing
- LinearOutSlowInEasing
- FastOutLinearInEasing
- LinearEasing

#### 自定义 Easing

例如，匀速动画：

```kotlin
offsetAnim.animateTo(offset, TweenSpec(easing = { it }))
```

动画完成度 **等于** 时间完成度，直接返回了 `it`

一般我们不需要自定义 Easing

#### 贝塞尔（Bezier）曲线完成动画

Compose 默认的 Easing，使用的就是 **三阶贝塞尔曲线（CubicBezierEasing）** 完成的

一个实用的工具网站：[cubic-bezier](https://cubic-bezier.com/#.17,.67,.83,.67)

## SnapSpec

Snap 是没有中间过程，直接变成目标值的动画类型，和 `snapTo` 的效果一致。

有一个参数，可以指定延迟

```kotlin
anim.animateTo(size, snap(1000))
```

## KeyframesSpec


```kotlin
anim.animateTo(size, KeyframesSpec(KeyframesSpec.KeyframesSpecConfig<Dp>().apply {  
    // 指定关键帧，即在哪个时间点的变量值是多少？  
}))
// 简便写法：  
anim.animateTo(size, keyframes {  
  
})
```

### `at` infix 函数

`at` 是一个 infix 函数，其定义如下：

```kotlin
infix fun T.at(/*@IntRange(from = 0)*/ timeStamp: Int): KeyframeEntity<T> {  
    return KeyframeEntity(this).also {  
        keyframes[timeStamp] = it  
    }  
}
```

所以定义关键帧的时候可以这样写：

```kotlin  
anim.animateTo(size, keyframes {  
    durationMillis = 1000  
    delayMillis = 500  
    114.dp at 150 with FastOutLinearInEasing  
})
```

1. 表示在 150 ms 的一个关键帧为 114.dp
2. `with` 函数可以指定速度曲线（指定的是后面一段动画的速度曲线，即 150ms - 1000 ms）

# SpringSpec

DurationBasedAnimation 都是固定时长的动画，另一类动画，例如弹簧动画，是模拟物理规律实现的动画，无法精确指定动画时长，需要通过实时计算来完成动画。

