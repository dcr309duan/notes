# 类型变量

## type

ts 中，可以使用 `type` 来定义别名，例如

```ts
type A = string // 定义为字符串
type A1 = number[] // 定义数组
type A2 = (num: number) => number // 定义为函数
type A3 = { age: number} // 定义为类
```

## interface

```ts
interface IUser {
	
}
```