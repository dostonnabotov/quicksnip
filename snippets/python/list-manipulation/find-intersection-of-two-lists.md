---
Title: Find Intersection of Two Lists
Description: Finds the common elements between two lists.
Author: axorax
Tags: python,list,intersection,utility
---

```
def list_intersection(lst1, lst2):
    return [item for item in lst1 if item in lst2]

# Usage:
list_a = [1, 2, 3, 4]
list_b = [3, 4, 5, 6]
print(list_intersection(list_a, list_b))  # Output: [3, 4]
```