# 什么叫消散型动画（decay，衰减）

有一个初速度，但是会受到阻力慢慢停下来

- animateTo 的核心目的是从起点，到终点，瞄准的是终点，最终一定停在一个终点。
- animateDecay 的应用场景是松手之后的惯性滑动，给一个初速度，慢慢衰减，不指定终点。

# animateDecay 基础

## DecayAnimationSpec

- splineBasedDecay: 样条算法
- rememberSplineBasedDecay
- exponentialDecay: 指数衰减

### splineBasedDecay 和 rememberSplineBasedDecay 的区别

- splineBasedDecay 会传递一个参数，为像素密度（density）
- rememberSplineBasedDecay 不需要传递这个参数

density 的作用是，在计算惯性滑动时，会根据像素密度进行计算。

> 注意：
> splineBasedDecay 只能用来计算基于像素的动画，不能用在角度的动画或者 dp 的动画。
> exponentialDecay 可以用于任何类型，这个实际上是用的最多的


