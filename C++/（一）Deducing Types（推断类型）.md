# 1 Item1: Understand template type deduction

函数模板类型推断的基本模式：
```cpp
template<typename T>
void f(ParamType param);

f(expr);
```

这里，通过 `expr` 进行类型推断有 2 处需要进行类型推断：
1. ParamType:
2. T

举个例子：基本的类型推断：
```cpp
template <typename T>  
void f(const T& param);

//...

int x = 0;
f(x);
```
在上面的代码中，`T` 被推断为 `int` ，函数 `f` 的参数被推断为 `const int&`

## 1.1 Case 1: `ParamType` 是引用或指针类型（但不是 Universal Reference）

1. 如果 `expr` 是引用类型，那么忽略掉其引用的的部分
2. 然后根据 `ParamType` 模式匹配具体的类型 T

### 1.1.1 基础情况
```cpp
template<typename T>
void f(T& param); // param is a reference
```

然后使用下面三种类型的参数：
```cpp
int x = 27;
const int cx = x;
const int& rcx = x;
```

类型推断的结果：
```cpp
f(x); // T is int, param's type is int&
f(cx); // T is const int, param's type is const int&
f(rcx); // T is const int, param's type is const int&
```

1. `const` 会被传入到泛型当中，这样保证了其不可变性
2. 第三个例子中，`T` 的推断类型不包含引用，这是我们上面说的第一条规则


### 1.1.2 如果加上 `const` 修饰呢？

```cpp
template<typename T>
void f(const T& param); // add const decorator

f(x); // T -> int, param's type is const int&
f(cx); // T -> int, param's type is const int&
f(rcx); // T -> int, param's type is const int&
```
我们加上 const，相当于告诉编译器额外的信息（要求），所以类型推断的结果都更稳定一些，在这种情况下，`T` 和 `param` 在这三种参数传入的情况下，类型推断的结果均一致。

### 1.1.3 指针的 case
```cpp
template<typename T>
void f(T* param);

int x= 27;
const int *px = &x;

f(&x); // T -> int, param's type is int*
f(px); // T is const int, param's type is const int*
```

这里表现的也很符合预期，T 会推断出变量本身的类型，不包含 const，但是 `const` 也被作为实际的参数类型传入。

## 1.2 Case 2：`ParamType` is a Universal Reference

[[Universal Reference]]
