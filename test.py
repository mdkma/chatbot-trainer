import numpy as np

x = np.zeros((3, 5))
x[1,] = [1,2,3,4,5]
print(x)

y = list([1,2,3])
print(y[:1])