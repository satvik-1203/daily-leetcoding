---
name: Product Of Array Except Self
difficulty: Medium
topics: Array, Prefix Sum
date: 09/29/2022
---

## Question

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is **guaranteed** to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and **without using the division operation**.

```txt:example showLineNumbers

Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

```

> Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

## Answer

If we could use division operator, this question would be an easy one. Find the product of the entire array and just divide by self. Sadly we can't use division operator :(.
But they aren't stopping us to create a division operator. Division is basically series of subtraction till 0.
However, this could be really slow if dividend is really big and divisor is really small.
The other way could be make the division operator using bit manipulation. But I believe not many would want to learn that haha.
So lets see if we could do this with just multiplication.

```txt:explanation showLineNumbers

arr = [1,2,3,4,2]
output = [48, 24, 16, 12, 24]

if we take index 2 in the array.

3 -> 8

thats basically (1 * 2) * (4 * 2) = 16

prefix = (1 * 2)
postfix = (4 * 2)

```

After looking at the example above, prefix for any element is the product of all element before it, vise versa, postfix for any element is the product after it.

One of our approach could be, for every element we could find prefix and postfix separately and multiply them to find the product of the array except self.
However, this looks like a costly operation since we have to do this for every element in the array which would give us a time of `O(n^2)`.

There is actually a slightly better way, which would be preserve the prefix and postfix for each element in 2 arrays.

```txt:explanation showLineNumbers

arr = [1,2,3,4,2]
output = [48, 24, 16, 12, 24]

prefix = [1, 1, 2, 6, 24]
postfix = [48, 24, 8, 2, 1]

output = [ prefix[i] * postfix[i] ]
output = [48 * 1, 24 * 1, 8 * 2, 2 * 6, 24 * 1]

```

Basically what the prefix array is, for an element index `i`, the prefix of it would be `prefix[i]` and postfix would be `postfix[i]`. Result would be `prefix[i] * postfix[i]`.
We make one loop to find the prefix and another loop to find the postfix, and last loop to find the result. That should give us a time of `O(n)`.

Yes, this would be perfect in time but this could be optimized even more, since this is an `O(n)` in space, excluding the output array.

Instead of storing the prefix and postfix in a separate array we could just hold them in the result array. Find the prefix first and store them in result array, then loop again the put the postfix in the res array itself by multiplying it.
This would give us an output of `O(1)` in space since output array isn't included in the space complexity, mentioned in the question.

```js:solution.js showLineNumbers

/**
  Time: O(n)
  Space: O(n)
**/

var productExceptSelf = function(nums) {
    let prefix = 1;
    let postfix = 1;

    const res = new Array(nums.length);

    // for prefix

    nums.forEach((el, index) => {
        res[index] = prefix;
        prefix *= el;
    })

    // for postfix
    // put the element back in the res array by multiplying

    for(let i = nums.length - 1; i >= 0; i--){
        res[i] *= postfix;
        postfix *= nums[i];
    }

    return res
};

```
