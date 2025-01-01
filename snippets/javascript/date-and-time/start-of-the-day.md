---
Title: Start of the Day
Description: Returns the start of the day (midnight) for a given date.
Author: axorax
Tags: javascript,date,start-of-day,utility
---

```
const startOfDay = (date) => new Date(date.setHours(0, 0, 0, 0));

// Usage:
const today = new Date();
console.log(startOfDay(today)); // Output: Date object for midnight
```