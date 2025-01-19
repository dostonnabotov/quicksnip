---
title: Read File
description: Reads all lines from a file and returns them as a string.
author: Legopitstop
tags: printing,file,read,utility
---

```swift
import Foundation

do {
    let content = try String(contentsOfFile: "example.txt", encoding: .utf8)
    print(content)
} catch {
    print("Error reading file: \\(error)\")"}
```
