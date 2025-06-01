## 0.1 核心思想

Pimpl 的核心是将类的**私有成员变量和实现细节**封装到一个单独的结构体（或类）中，并通过一个指针（通常是 `std::unique_ptr` 或裸指针）在头文件中引用该结构体。这样，当实现细节发生变化时，只需重新编译实现文件，而无需重新编译所有包含头文件的代码。

## 0.2 实现

头文件：
```cpp
// MyClass.h
#pragma once
#include <memory>

class MyClass {
public:
    MyClass();
    ~MyClass();  // 必须定义析构函数（见下文解释）
    void doSomething();
    
private:
    class Impl;            // 前向声明实现类
    std::unique_ptr<Impl> pImpl;  // 不透明指针
};

```

实现：
```cpp
// MyClass.cpp
#include "MyClass.h"
#include <iostream>

class MyClass::Impl {
public:
    int value;
    void internalMethod() {
        std::cout << "Internal: " << value << std::endl;
    }
};

MyClass::MyClass() : pImpl(std::make_unique<Impl>()) {
    pImpl->value = 42;
}

MyClass::~MyClass() = default;  // 必须在此定义析构函数

void MyClass::doSomething() {
    pImpl->internalMethod();
}

```