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

1. 第一个脚本主要是重定向依赖下载地址，重定向到 jetbrains 的 cache 仓库，提高依赖下载的速度和稳定性
2. 第二个脚本主要是和自举构建 kotlin 有关

## 1.3 插件仓库配置

```groovy
repositories {  
    maven {  
        url "https://packages.jetbrains.team/maven/p/ij/intellij-dependencies"  
        content {  
            includeGroupByRegex("org\\.jetbrains\\.intellij\\.deps(\\..+)?")  
        }  
    }    maven { url "https://maven.pkg.jetbrains.space/kotlin/p/kotlin/kotlin-dependencies" }  
    google()  
    mavenCentral()  
    gradlePluginPortal()  
}
```

[[kotlin/gradle/repositories|repositories]] 定义依赖仓库 

## 1.4 插件应用

```groovy
plugins {  
    id "de.undercouch.download" version "5.1.0"  
}
```

这里通过 [[kotlin/gradle/plugins|plugins]] 应用了 [[kotlin/gradle/plugins/de.undercouch.download|de.undercouch.download]] 插件，这个插件主要是用于文件下载的。

# 2 plugins

```groovy
plugins {  
    id "internal-gradle-setup" // it's recommended to apply this plugin at first, as it changes the local.properties file  
    id "develocity"  
    id "jvm-toolchain-provisioning"  
    id "kotlin-daemon-config"  
}
```

全局应用了四个插件：

- [[kotlin/gradle/plugins/internal-gradle-setup|internal-gradle-setup]]
- [[kotlin/gradle/plugins/develocity|develocity]]
- [[kotlin/gradle/plugins/jvm-toolchain-provisioning|jvm-toolchain-provisioning]]
- [[kotlin/gradle/plugins/kotlin-daemon-config|kotlin-daemon-config]]

这四个插件，对应 `repo/gradle-settings-conventions` 目录下的这四个插件：[[kotlin/gradle/plugins/custom plugin|custom plugin]]


![[Pasted image 20250302092152.png]]