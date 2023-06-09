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

```kotlin
fun <T> spring(  
    dampingRatio: Float = Spring.DampingRatioNoBouncy,  
    stiffness: Float = Spring.StiffnessMedium,  
    visibilityThreshold: T? = null  
)
```

spring 函数有三个参数：

- `dampingRation`: 阻尼比，设置弹簧的弹性。
	- 默认为 1，不会弹过头，回去就停下来。
	- 这个值设置的越大，回弹的越慢
	- 设置的越小，弹性就越厉害
- `stiffness`: 钢度，弹窗的硬度，有多快能弹回去
- `visibilityThreshold`: 可视阈值
	- 弹簧模型没法按照时间去结束动画
	- 通过这个阈值来结束动画，默认为 0.01
	- ![[Pasted image 20230503181758.png]]

## 动画初始速度

如果我们需要动画原地震动，可以设置一个初始速度。

```kotlin
anim.animateTo(  
    48.dp,  
    spring(0.1f, stiffness = Spring.StiffnessVeryLow),  
    initialVelocity = 2000.dp  // 设置初始速度，实现弹簧震动的效果
)
```

# RepeatableSpec

repeatable 中传入一个 `DurationBasedAnimationSpec`，例如一个 `TweenSpec`

```kotlin
LaunchedEffect(big) {  
    anim.animateTo(size, repeatable(3, tween()))  
}
```

函数定义：

```kotlin
@Stable  
fun <T> repeatable(  
    iterations: Int,  
    animation: DurationBasedAnimationSpec<T>,  
    repeatMode: RepeatMode = RepeatMode.Restart,  
    initialStartOffset: StartOffset = StartOffset(0)  
)
```

- `iterations`: 重复次数
- `animation`: 动画
- `repeatMode`: 有两种模式，`Restart` or `Reverse`
- `initialStartOffset`: 启动偏移，有两种模式：`Delay` 和 `FastForward`
	- Delay: 就是对动画做一个延时
	- FastForward: 快进到指定的时间点，开始执行动画

## InfiniteRepeatableSpec

功能是无限重复的动画，API 基本上和 RepeatableSpec 一致，不需要设置迭代次数，为无限循环。

无限循环动画，在协程退出的时候才会停止执行