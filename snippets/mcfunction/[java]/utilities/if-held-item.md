---
title: If Held Item
description: Runs a command when you hold an Apple.
author: Legopitstop
tags: execute,java
---

```mcfunction
# Check held item (run every tick)
execute as @a[nbt={SelectedItem:{id:"minecraft:apple"}}] at @s run say Apple!
```
