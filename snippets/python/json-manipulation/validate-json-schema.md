---
Title: Validate JSON Schema
Description: Validates a JSON object against a predefined schema.
Author: axorax
Tags: python,json,validation,schema
---

```
import jsonschema
from jsonschema import validate

def validate_json_schema(data, schema):
    try:
        validate(instance=data, schema=schema)
        return True  # Data is valid
    except jsonschema.exceptions.ValidationError as err:
        return False  # Data is invalid

# Usage:
schema = {
    'type': 'object',
    'properties': {
        'name': {'type': 'string'},
        'age': {'type': 'integer'}
    },
    'required': ['name', 'age']
}
data = {'name': 'John', 'age': 30}
is_valid = validate_json_schema(data, schema)
print(is_valid)  # Output: True
```