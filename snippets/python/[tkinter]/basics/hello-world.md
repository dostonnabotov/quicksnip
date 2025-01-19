---
title: Hello, World!
description: Creates a basic Tkinter window with a "Hello, World!" label.
author: Legopitstop
tags: app,hello-world
---

```py
from tkinter import Tk, Label

root = Tk()
root.geometry("100x100")
Label(root, text="Hello, World!").pack()
root.mainloop()
```
