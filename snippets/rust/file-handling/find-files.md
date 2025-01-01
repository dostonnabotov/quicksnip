---
Title: Find Files
Description: Finds all files of the specified extension within a given directory.
Author: Mathys-Gasnier
Tags: rust,file,search
---

```
fn find_files(directory: &str, file_type: &str) -> std::io::Result<Vec<std::path::PathBuf>> {
    let mut result = vec![];

    for entry in std::fs::read_dir(directory)? {
        let dir = entry?;
        let path = dir.path();
        if dir.file_type().is_ok_and(|t| !t.is_file()) &&
            path.extension().is_some_and(|ext| ext != file_type) {
            continue;
        }
        result.push(path)
    }

    Ok(result)
}

// Usage:
let files = find_files("/path/to/your/directory", ".pdf")
```