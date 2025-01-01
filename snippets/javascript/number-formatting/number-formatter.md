---
Title: Number Formatter
Description: Formats a number with suffixes (K, M, B, etc.).
Author: realvishalrana
Tags: javascript,number,format,utility
---

```
const nFormatter = (num) => {
  if (!num) return;
  num = parseFloat(num.toString().replace(/[^0-9.]/g, ''));
  const suffixes = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
  let index = 0;
  while (num >= 1000 && index < suffixes.length - 1) {
    num /= 1000;
    index++;
  }
  return num.toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + suffixes[index];
};

// Usage:
console.log(nFormatter(1234567)); // Output: '1.23M'
```