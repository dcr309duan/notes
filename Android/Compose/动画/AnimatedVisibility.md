AnimatedVisib
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