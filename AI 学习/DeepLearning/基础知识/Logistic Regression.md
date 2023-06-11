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

### Loss (error) function: 

如果这样定义 loss function，会导致结果是非凸的，导致不好求解：
$$
L(\hat{y}, y) = \frac{1}{2}(\hat{y} - y)^{2}
$$

那么我们会将 loss function 定义为：

$$
L(\hat{y}, y) = -\left(y\log{\hat{y}} + (1-y)\log{(1 - \hat{y}})\right)
$$

- $y$ 是通过 sigmoid function 计算得来的，所以其值在 $[0, 1]$ 区间内
- if $y = 1$: $L(\hat{y}, y) = -\log{\hat{y}}$, 这种情况下，我们期望 $\hat{y}$ 越大越好
- if $y = 0$: $L(\hat{y}, y) = -\log{(1 - \hat{y})}$，在这种情况下，我们期望 $\hat{y}$ 越小越好

### Cost Function

Cost Function 是在所有的训练集上的 Loss Function 的和：
$$
J(w, b) = \frac{1}{m}\sum_{i = 1}^m\left( 
L(\hat{y}^{(i)}, y^{(i)})
\right)

= -\frac{1}{m}\sum_{i=1}^my^{(i)}\log{\hat{y}^{(i)}} + 
$$

