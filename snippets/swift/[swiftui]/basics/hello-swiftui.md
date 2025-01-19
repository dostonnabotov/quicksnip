---
title: Hello, SwiftUI
description: Creates a basic SwiftUI with "Hello, World!" text.
author: Legopitstop
tags: ui,hello-world
---

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
            .imageScale(.large)
            .foregroundStyle(.tint)
            Text("Hello, World!")
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
```
