**Universal Reference（通用引用）** 是 C++ 中模板编程中的一个关键概念，由 Scott Meyers 提出，用于描述一种特殊的引用类型 `T&&`，它在模板参数中能够根据传入的实参类型自动推导为**左值引用（`T&`）或右值引用（`T&&`）**，从而实现对任意类型的完美转发（Perfect Forwarding）。

## 基本定义
- 在模板参数中，这样定义 `T&&`，它既可以绑定到左值（lvalue），也可以绑定到右值（rvalue）。
- 它的本质是**类型推导**的结果，而不是固定的引用类型。

基础语法：

```cpp
template<typename T>
void func(T&& arg);  // arg 是 Universal Reference
```

## 引用折叠

![[Pasted image 20250530095349.png]]

通用引用、完美转发、自动类型推导（`auto&&`）