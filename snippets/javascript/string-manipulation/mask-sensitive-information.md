---
Title: Mask Sensitive Information
Description: Masks parts of a sensitive string, like a credit card or email address.
Author: axorax
Tags: string,mask,sensitive
---

```
function maskSensitiveInfo(str, visibleCount = 4, maskChar = '*') {
  return str.slice(0, visibleCount) + maskChar.repeat(Math.max(0, str.length - visibleCount));
}

// Example usage:
console.log(maskSensitiveInfo('123456789', 4)); // Output: '1234*****'
console.log(maskSensitiveInfo('example@mail.com', 2, '#')); // Output: 'ex#############'
```