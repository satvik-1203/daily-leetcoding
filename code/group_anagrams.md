---
name: Group Anagrams
difficulty: Medium
topics: Array, Hash Table, String, Sorting
date: 09/27/2022
---

## Question:

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

```txt:.txt showLineNumbers
examples:

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Input: strs = [""]
Output: [[""]]

```

## Answer

To check if 2 words are anagrams, we need to make sure they have same amount of characters.

How do we tell if tea and eat are anagrams? There are couple of ways to do it but the one I'll be doing is by check if they have same sorted charCode. eat - aet, tea - aet. Since they have same sorted charCode we can tell they are anagrams. There is another simpler way but I don't want to complicate this code so let's just follow this one :).

Time: O(n _ klogk)
Space: O(n _ k)

```js:example.js showLineNumbers

/**
 * @param {string[]} strs
 * @return {string[][]}
 */

var groupAnagrams = function(strs) {
    const map = new Map();

    strs.forEach(el => {
        const sortedEl = el.split("").sort((a,b)=> a.charCodeAt(0)-b.charCodeAt(0)).join("");

        if(map.has(sortedEl)) map.get(sortedEl).push(el);
        else map.set(sortedEl, [el]);
    })

    return ([...map.values()])
};

```
