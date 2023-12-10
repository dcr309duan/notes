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
if (x) {
	// ...
}

if (x) {
	// ...
} else {
	// ...
}


if (x) {
	// ...
} else if (x) {
	// ...
} else {
	// ...
}

switch(x) {
	case A: {
		// ...
		break;
	}
	case B: {
		// ...
		break;
	}
	default: {
		// ...
		break;
	}
}
```

# 函数

使用 `function` 关键字定义函数：

```ts
// 有名函数
function add(x: number, y: number): number {
	return x + y;
}

// 匿名函数
let myAdd = function(x: number, y: number): number {
	return x + y;
}
```

可以使用 `?` 来让参数变为可选参数

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + ' ' + lastName;
    else
        return firstName;
}

let result1 = buildName('Bob');
let result2 = buildName('Bob', 'Adams'); 
```

剩余参数

```ts
function getEmployeeName(firstName: string, ...restOfName: string[]) {
  return firstName + ' ' + restOfName.join(' ');
}

let employeeName = getEmployeeName('Joseph', 'Samuel', 'Lucas', 'MacKinzie');
```

箭头函数：

```ts
( [param1, parma2,…param n] )=> {
    // 代码块
}

let arrowFun = ( [param1, parma2,…param n] )=> {
    // 代码块
}

arrowFun(param1, parma2,…param n)
```

# 类

```ts
class Person {
  private name: string
  private age: number

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public getPersonInfo(): string {
    return `My name is ${this.name} and age is ${this.age}`;
  }
}
```

继承：

```ts
class Employee extends Person {
  private department: string

  constructor(name: string, age: number, department: string) {
    super(name, age);
    this.department = department;
  }

  public getEmployeeInfo(): string {
    return this.getPersonInfo() + ` and work in ${this.department}`;
  }
}
```

# 模块

两个模块之间的关系是通过在文件级别上使用 import 和 export 建立的。模块里面的变量、函数和类等在模块外部是不可见的，除非明确地使用 export 导出它们。类似地，我们必须通过 import 导入其他模块导出的变量、函数、类等。

```ts
export class NewsData {
  title: string;
  content: string;
  imagesUrl: Array<NewsFile>;
  source: string;

  constructor(title: string, content: string, imagesUrl: Array<NewsFile>, source: string) {
    this.title = title;
    this.content = content;
    this.imagesUrl = imagesUrl;
    this.source = source;
  }
}
```

导入：

```ts
import { NewsData } from '../common/bean/NewsData';
```

# 迭代器

```ts
let someArray = [1, "string", false];

for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}
```

for..of和for..in均可迭代一个列表，但是用于迭代的值却不同：for..in迭代的是对象的键，而for..of则迭代的是对象的值。

```ts
let list = [4, 5, 6];

for (let i in list) {
    console.log(i); // "0", "1", "2",
}

for (let i of list) {
    console.log(i); // "4", "5", "6"
}
```