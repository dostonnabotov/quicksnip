---
Title: Remove Duplicates
Description: Removes duplicate elements from a list while maintaining order.
Author: dostonnabotov
Tags: python,list,duplicates,utility
---

```
def remove_duplicates(lst):
    return list(dict.fromkeys(lst))

# Usage:
print(remove_duplicates([1, 2, 2, 3, 4, 4, 5]))  # Output: [1, 2, 3, 4, 5]
```