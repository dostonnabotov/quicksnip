---
title: Write File
description: Writes a string to a file.
author: Legopitstop
tags: printing,file,write,utility
---

```swift
import Foundation
let content = "Hello, World!"
do {
    try content.write(toFile: "example.txt", atomically: true, encoding: .utf8)
} catch {
    print("Error writing to file: \\(error)\")"}"
```
