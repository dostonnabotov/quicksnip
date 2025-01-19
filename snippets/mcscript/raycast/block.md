---
title: Block
description: Performs a raycast for 10 blocks, checking for air and placing a stone block when it hits white wool.
author: legopitstop
tags: raycast,block
---

```mcscript
raycast(10,"air",block "white_wool") {
    /setblock ~ ~ ~ stone
}
```
