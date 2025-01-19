---
title: If Held Item
description: Runs a command when you hold an Apple.
author: Legopitstop
tags: execute,bedrock
---

```mcfunction
# Check held item (run every tick)
execute as @a[hasitem={item=apple}] at @s run say Apple!
```
