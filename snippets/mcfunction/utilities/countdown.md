---
title: Countdown
description: A countdown timer using a scoreboard, decrementing the value every tick and performing an action when the countdown reaches 1.
author: Legopitstop
tags: execute,scoreboard,java,bedrock
---

```mcfunction
# Initialize the scoreboard (run once)
scoreboard objectives add countdown dummy

# Set the countdown (run conditionally)
scoreboard players set @s countdown 40

# Decrement countdown value (run every tick)
execute if score @a countdown matches ..1 run scoreboard players remove @s countdown 1

# Run command at end of countdown (run every tick)
execute if score @a countdown matches 1 run say Countdown!
```
