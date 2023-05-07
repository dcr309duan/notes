Crossfade 可以用来切换内容。

例如，有一个变量，为 true 的时候，显示 A 内容，false 的时候，显示 B 内容。

```kotlin
Column {  
    Crossfade(targetState = shown, label = "") {  
        if (it) {  
            Box(  
                modifier = Modifier  
                    .size(24.dp)  
                    .background(Color.Green)  
            )        } else {  
            Box(  
                modifier = Modifier  
                    .size(48.dp)  
                    .background(Color.Red)  
            )        }    }  
  
  
    Button(onClick = { shown = !shown }) {  
        Text(text = "切换")  
    }  
}
```