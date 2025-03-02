# 1 Gradle 插件构建

Gradle 自定义插件可以参考：[[Kotlin/gradle/plugins/custom plugin|custom plugin]]

# 2 插件功能

# 3 插件结构

## 3.1 build.gradle.kts

### 3.1.1 依赖的插件：

```kotlin
plugins {  
    `kotlin-dsl`  
    kotlin("jvm")  
    kotlin("plugin.serialization")  
}
```

- [[Kotlin/gradle/plugins/kotlin-dsl|kotlin-dsl]]: 启动 kotlin dsl 支持
- `jvm`
- [[kotlin/gradle/plugins/plugin-serialization|plugin.serialization]]: 序列化
- 

