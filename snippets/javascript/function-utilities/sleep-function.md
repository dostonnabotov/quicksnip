---
Title: Sleep Function
Description: Waits for a specified amount of milliseconds before resolving.
Author: 0xHouss
Tags: javascript,sleep,delay,utility,promises
---

```
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Usage:
async function main() {
  console.log('Hello');
  await sleep(2000); // Waits for 2 seconds
  console.log('World!');
}

main();
```