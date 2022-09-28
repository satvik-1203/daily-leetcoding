---
name: Remove Nth node from the end of the list
difficulty: Medium
topics: LinkedList, Two Pointers
date: 09/27/2022
---

## Question:

Given the head of a linked list, remove the nth node from the end of the list and return its head.

```txt:.txt showLineNumbers
examples:

Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Input: head = [1], n = 1
Output: []

Input: head = [1,2], n = 2
Output: [2]


Constrains:

- The number of nodes in the list is sz.
- 1 <= sz <= 30
- 0 <= Node.val <= 100
- 1 <= n <= sz

```

## Answer

Time: O(n)
space: O(1)

Essentially we use 2 pointers, left and right. the difference between left n right will always be `n` such that when `right.next == null` we can just perform `left.next = left.next.next` and return `head`.

The only edge case is remove first. and in case of remove first, maintaining the n difference between left and right would make us start at `right == null` which means `return left.next`.

```js:example.js showNumberLines

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

var removeNthFromEnd = function(head, n) {

    if(!head.next) return null

    let right = head;

    for(let i = 1; i<= n; i++){
        right = right.next;
    }

    let left = head;

    if(!right) return head.next;

    while(right.next){
        left = left.next;
        right = right.next;
    }

    left.next = left.next.next;

    return head;
};

```

Question: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
