---
title: Truncate Strings
description: Truncates a string to a specified length, optionally adding an ellipsis.
author: ACR1209
tags: ruby,string,truncate,utility
---

```rb
def truncate_string(max_length, str)
    return str if str.length <= max_length
    str[0, max_length - 3] + '...'
end

long_string = "Ruby is a dynamic, open source programming language."
puts truncate_string(20, long_string) # Output: "Ruby is a dynamic..."
puts truncate_string(54, long_string) # Output: "Ruby is a dynamic, open source programming language."
```