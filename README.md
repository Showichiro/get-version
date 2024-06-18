# get-version

`get-version` is a command-line tool that asynchronously retrieves the version
number from a JSON file at the specified path.

## Overview

This tool extracts the version number from a JSON file used to manage a
project's version information. The JSON file typically stores the version
information under the key name `version`.

## Usage

### Installation

FIXME:

### Command Structure

```console
  Usage: get-version [path]

  This command retrieves the version number from a JSON file located at the specified path.

  Options:
    -h, --help      Show this help message.
```

### Example

Via CLI

```sh
get-version ./package.json # 1.0.0
```

Via Source Code

```ts
import { getVersion } from "@showichiro/get-version";

const version = await getVersion("./deno.json");
console.log(version);
```

## License

MIT
