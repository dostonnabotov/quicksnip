---
title: Drop Crafting
description: Spawns an enchanted golden apple when you drop a diamond and golden apple on a crafting table.
author: Legopitstop
tags: execute,summon,kill,crafting,java
---

```mcfunction
# Check for items on crafting table (runs every tick)
execute as @e[type=item,nbt={Item:{id:"minecraft:diamond",Count:1b}}] at @s if entity @e[type=item,nbt={Item:{id:"minecraft:golden_apple",Count:1b}},distance=..1] if block ~ ~-1 ~ minecraft:crafting_table run function quicksnip:crafting/enchanted_golden_apple

# Function: quicksnip:crafting/enchanted_golden_apple
summon item ~ ~1 ~ {Item:{id:"minecraft:enchanted_golden_apple",Count:1b}}
kill @e[type=item,nbt={Item:{id:"minecraft:diamond",Count:1b}}]
kill @e[type=item,nbt={Item:{id:"minecraft:golden_apple",Count:1b}}]
```
