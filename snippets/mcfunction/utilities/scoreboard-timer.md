---
title: Scoreboard Timer
description: Performs actions when the timer reaches a specific value.
author: Legopitstop
tags: execute,scoreboard,java,bedrock
---

```mcfunction
# Initialize the scoreboard (run once)
scoreboard objectives add timer dummy

# Increment the timer (run every tick)
scoreboard players add @a timer 1

# Check the timer value (run every tick)
execute if score @a timer matches 100.. run say Timer reached 100!

# Reset timer (run every tick)
execute if score @a timer matches 100.. run scoreboard players set @a timer 0
```
