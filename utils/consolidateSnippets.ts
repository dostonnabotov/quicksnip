import { copyFileSync, writeFileSync } from "fs";
import { join } from "path";
import { exit } from "process";

import { parseAllSnippets } from "./snippetParser.ts";
import { LanguageType } from "../src/types";
import { reverseSlugify } from "../src/utils/slugify";

const dataPath = "public/consolidated/";
const indexPath = join(dataPath, "_index.json");
const iconPath = "public/icons/";
const snippetsPath = "snippets/";

const [errored, snippets] = parseAllSnippets();

if (errored) {
  exit(1);
}

const languages: LanguageType[] = [];
for (const [language, categories] of Object.entries(snippets)) {
  const languageIconPath = join(snippetsPath, language, "icon.svg");

  copyFileSync(languageIconPath, join(iconPath, `${language}.svg`));

  languages.push({
    lang: reverseSlugify(language).toUpperCase(),
    icon: `/icons/${language}.svg`,
  });

  const languageFilePath = join(dataPath, `${language}.json`);

  writeFileSync(languageFilePath, JSON.stringify(categories, null, 4));
}

writeFileSync(indexPath, JSON.stringify(languages, null, 4));
