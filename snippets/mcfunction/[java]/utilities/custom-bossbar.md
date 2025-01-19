---
title: Custom Bossbar
description: Creates a custom bossbar
author: Legopitstop
tags: bossbar,java
---

```mcfunction
# Create the bossbar (run once)
bossbar add quicksnip:bossbar "Boss Health"

# Set the bossbar properties
bossbar set quicksnip:bossbar max 100
bossbar set quicksnip:bossbar color red
bossbar set quicksnip:bossbar visible true

# Update the bossbar dynamically
bossbar set quicksnip:bossbar value 50
```
