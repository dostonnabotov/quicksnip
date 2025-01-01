---
Title: Pad String on Both Sides
Description: Pads a string on both sides with a specified character until it reaches the desired length.
Author: axorax
Tags: string,pad,manipulation
---

```
function padString(str, length, char = ' ') {
  const totalPad = length - str.length;
  const padStart = Math.floor(totalPad / 2);
  const padEnd = totalPad - padStart;
  return char.repeat(padStart) + str + char.repeat(padEnd);
}

// Example usage:
console.log(padString('hello', 10, '*')); // Output: '**hello***'
```