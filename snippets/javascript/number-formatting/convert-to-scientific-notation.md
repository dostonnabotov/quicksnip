---
Title: Convert to Scientific Notation
Description: Converts a number to scientific notation.
Author: axorax
Tags: javascript,number,scientific,utility
---

```
const toScientificNotation = (num) => {
  if (isNaN(num)) {
    throw new Error('Input must be a number');
  }
  if (num === 0) {
    return '0e+0';
  }
  const exponent = Math.floor(Math.log10(Math.abs(num)));
  const mantissa = num / Math.pow(10, exponent);
  return `${mantissa.toFixed(2)}e${exponent >= 0 ? '+' : ''}${exponent}`;
};

// Usage:
console.log(toScientificNotation(12345)); // Output: '1.23e+4'
console.log(toScientificNotation(0.0005678)); // Output: '5.68e-4'
console.log(toScientificNotation(1000)); // Output: '1.00e+3'
console.log(toScientificNotation(0)); // Output: '0e+0'
console.log(toScientificNotation(-54321)); // Output: '-5.43e+4'
```