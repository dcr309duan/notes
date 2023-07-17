HTML 的 Hello World：

```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
<meta charset="UTF-8">  
<meta http-equiv="X-UA-Compatible" content="ie=edge">  
<meta name="viewport" content="width=device-width, initial-scale=1.0">  
<title>Document</title>  
</head>  
<body>  
<h1>hello world</h1>  
</body>  
</html>
```

代码解析：

下面这句话决定浏览器使用什么方式渲染：下面表示使用标准模式进行渲染（否则默认使用混杂模式），**这句话必须放在首行**
```html
<!DOCTYPE html>
```

给浏览器提供翻译建议：
```html
<html lang="en">
```

使用最新的 IE 内核渲染：
```html 
<meta http-equiv="X-UA-Compatible" content="ie=edge"> 
```

在移动端展示：
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">  
```