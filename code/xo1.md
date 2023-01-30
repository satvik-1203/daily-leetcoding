---
name: Find The Pivot Positions
difficulty: Medium
topics: Greedy, Prefix, Postfix, Array
data: 30/01/2023
---

# Find the number of pivots in the array

A number in the array is a pivot position if all the numbers on the left are less than the number,
and vice versa; all the numbers on the right are greater than the number in the array.

For example:

```txt:example showLineNumbers

arr = [2, 1, 3, 7, 5, 8]

3 is a pivot number since all the numbers on the left are less than 3
and all the numbers on the right are greater than 3.

Similarly, 8 is also a pivot position. And in total, we have two pivot positions.
```

Constraints:
Time complexity should be within O(n)
The number ranges between 0 to 100,000

## Solution

The ideal way to solve this problem is by looping through all the numbers and checking
if the number is in a pivot position. And to check if a number is a pivot position,
it would take O(n) operation since we will be moving through the entire array and comparing it with the current number.

So checking if a number is a pivot by the traditional way would take the time complexity to O(n^2),
which is much slower than O(n). But since we know that we have to make repeated computations,
there should be a greedy algorithm that takes care of this problem. After thinking for a while, I used prefix and postfix numbers.

So how exactly will we be doing that?

```txt:example showLineNumbers
arr = [2, 1, 3, 7, 5, 8]

Suppose we are at 3.
We need to ensure the maximum number to the left of 3 is less than 3,
and the minimum number on the right is greater than 3.

So on the left side, the maximum number is 2, and right side, the minimum number is 5.
Since 2 <= 3 <= 5, 3 is a pivot position.
```

Now that we understand how to find pivot positions with prefixes and postfixes, we can come up with another solution. We make two arrays, one that holds all the maximums from the left and another with all the minimums.

```js:example showLineNumbers
arr = [2, 1, 3, 7, 5, 8]
leftMax = [2, 2, 3, 7, 5, 8]
rightMin = [1, 1, 3,5, 5, 8]
```

Once we can get those two arrays, we can do
`if(leftMax[idx - 1] <= el <= rightMax[idx + 1]): pivotCounts += 1`

And that's all the code you need.

```py:solution showLineNumbers

def solution(data):
  leftMax = []
  rightMax = []
  pivotCounts = 0

  prevMax = 0
  for el in data:
    prevMax = max(prevMax, el)
    leftMax.append(prevMax)

  prevMin = 100_001
  for el in reversed(data):
    prevMin = min(prevMin, el)
    rightMax.insert(0, prevMin)


  for idx, el in enumerate(data):
    if(idx == 0):
      if(el <= rightMax[1]):
        pivotCounts+=1
    elif(idx == len(data) - 1):
      if(leftMax[len(data) - 2] <= el):
        pivotCounts+=1
    else:
      if(leftMax[idx - 1] <= el <= rightMax[idx + 1]):
        pivotCounts+=1

  print(pivotCounts)
```
