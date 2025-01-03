import { exit } from "process";

import { parseAllSnippets } from "./snippetParser.ts";

const [errored] = parseAllSnippets();

if (errored) {
  exit(1);
}
