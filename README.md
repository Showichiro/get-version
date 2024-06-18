# get-version

`get-version` asynchronously retrieves the version number from a JSON file at
the specified path.

## Overview

This tool extracts the version number from a JSON file used to manage a
project's version information. The JSON file typically stores the version
information under the key name `version`.

## Usage

### Example

Via Source Code

```ts
import { getVersion } from "@showichiro/get-version";

const version = await getVersion("./deno.json");
console.log(version);
```

## License

MIT
