# 基本类型

- boolean: 布尔值
- number: 数字
- string: 字符串
- number[]、Array\<number\>：数组
	- `let list: number[] = [1, 2, 3]
	- `let list: Array<number> = [1, 2, 3]`
- `[a, b]`: 元组
	- `let x: [string, number]`
- enum: 枚举
- unknown: 编译时再进行类型检查，动态类型
- void: 空类型，例如函数无返回值可以使用 void
- null, undefined: 两个特殊的类型
- `A | B`: 联合类型：例如 `string | number`，多个类型中的一种

# 条件语句

```ts
var num: number = 5
if (num > 0)
```