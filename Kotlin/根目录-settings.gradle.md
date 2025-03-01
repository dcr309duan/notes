# 1 pluginManagement

```groovy
pluginManagement {  
    includeBuild("repo/gradle-settings-conventions")  
    includeBuild("repo/gradle-build-conventions")  
  
    apply from: 'repo/scripts/cache-redirector.settings.gradle.kts'  
    apply from: 'repo/scripts/kotlin-bootstrap.settings.gradle.kts'  
  
    repositories {  
        maven {  
            url "https://packages.jetbrains.team/maven/p/ij/intellij-dependencies"  
            content {  
                includeGroupByRegex("org\\.jetbrains\\.intellij\\.deps(\\..+)?")  
            }  
        }        maven { url "https://maven.pkg.jetbrains.space/kotlin/p/kotlin/kotlin-dependencies" }  
        google()  
        mavenCentral()  
        gradlePluginPortal()  
    }  
  
    plugins {  
        id "de.undercouch.download" version "5.1.0"  
    }  
}
```

`pluginManagement` 是 Gradle 构建工具中用于集中管理插件仓库和版本的核心配置机制，主要作用于全局构建逻辑。

## 1.1 包含其他构建

```groovy
includeBuild("repo/gradle-settings-conventions") 
includeBuild("repo/gradle-build-conventions")
```

[[includeBuild]] 将其他 Gradle 项目作为复合构建的一部分包含进来。这里包含了两个位于 `repo` 目录下的项目：

- [[gradle-settings-conventions]]
- [[gradle-build-conventions]]

## 1.2 应用外部脚本

```groovy
apply from: 'repo/scripts/cache-redirector.settings.gradle.kts'  
apply from: 'repo/scripts/kotlin-bootstrap.settings.gradle.kts'
```

[[apply from]]
