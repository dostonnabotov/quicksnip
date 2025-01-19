---
title: Entity
description: Performs a raycast for 10 blocks, checking for air and placing a stone block when it hits an armor stand.
author: Legopitstop
tags: raycast,entity
---

```mcscript
raycast(10,"air",entity @e[type=armor_stand]) {
    /setblock ~ ~ ~ stone
}
```
