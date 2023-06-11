# Basic Defination

![[Pasted image 20230611205128.png]]

Input:

- An image
- $\vec{x}$: 64 x 64 x 3 = 12,288
- $y$: 1 or 0

数学形式的表达：
- $n_x$: dimension of input data
- $\boldsymbol{x} \in \mathbb{R}^{n_{x}}, y \in \{0, 1\}$
- 训练集规模：$m$, $m$ training examples
- $m_{test}$: 测试集规模
- 训练集表示：$X \in \mathbb{R}^{n_x \times m}$
- 测试集表示：$Y \in \mathbb{R}^{1 \times m}$, $Y = [y^{(1)}, y^{(2)}, \dots, y^{m}]$


# Logistic Regression

## Model Defination: 

- Parameters: $\boldsymbol{w} \in \mathbb{R}^{n_{x}}, b \in \mathbb{R}$
- Output: $\hat{y} = \sigma(\boldsymbol{w}^T\boldsymbol{x} + b)$
- $\sigma$: [[Sigmoid function]]

## Cost Function

Given $\{(x^{(1), y^{(1)}}), \dots, (x^{(m)}, y^{(m)})\}$, want $\hat{y}^{(i)} \approx y^{(i)}$

Loss (error) function: 

$L(\hat{y}, y) = \frac{1}{2}(\hat{y})^{2}$