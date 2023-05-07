AnimatedVisibility 有一个参数，表示组件显示还是消失，内部内容就会受这个变量的控制，按照动画的方式显示和消失

```kotlin
Column {  
    var shown by remember {  
        mutableStateOf(true)  
    }  
    AnimatedVisibility(visible = shown) {  
        TransitionSquare()  
    }  
    Button(onClick = { shown = !shown }) {  
        Text(text = "切换")  
    }  
}
```

