---
title: Clearfix
description: Provides a clearfix utility for floating elements.
author: dostonnabotov
tags: clearfix,utility,css
---

```scss
@mixin clearfix {
  &::after {
    content: '';
    display: block;
    clear: both;
  }
}
```
