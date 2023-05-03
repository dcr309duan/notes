# SpringSpec
animateTo 默认使用了一个 SpringSpec：
![[Pasted image 20230503151227.png]]
默认使用的是没有回弹效果：
![[Pasted image 20230503151328.png]]
我们可以进行指定：

```kotlin
anim.animateTo(size, spring(Spring.DampingRatioMediumBouncy))
```

# TweenSpec
