# 1 资料

- [自定义 Gradle 插件](https://docs.gradle.org/current/userguide/plugin_basics.html#3_local_plugins)

# 2 自定义插件的流程

## 2.1 定义 plugin 类

```kotlin
// Define a 'HelloPlugin' plugin
class HelloPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        // Define the 'hello' task
        val helloTask = project.tasks.register("hello") {
            doLast {
                println("Hello, Gradle!")
            }
        }
    }
}
```