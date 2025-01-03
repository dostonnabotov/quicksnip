import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";

import { CategoryType, RawSnippetType, SnippetType } from "../src/types";
import { isCorrectType } from "../src/utils/objectUtils";
import { raise } from "../src/utils/raise";
import { reverseSlugify, slugify } from "../src/utils/slugify";

const crlfRegex = /\r\n/gm;
const propertyRegex = /^\s+([a-zA-Z]+):\s*(.+)/;
const headerEndCodeStartRegex = /^\s*---\s*```.*\n/;
const codeRegex = /^(.+)```/s;

let errored = false;

function parseSnippet(
  snippetPath: string,
  name: string,
  text: string
): SnippetType | null {
  if (crlfRegex.exec(text) !== null) {
    return raise(
      "Found CRLF line endings instead of LF line endings",
      snippetPath
    );
  }
  let cursor = 0;

  const fromCursor = () => text.substring(cursor);

  if (!fromCursor().trim().startsWith("---")) {
    return raise("Missing header start delimiter '---'", snippetPath);
  }
  cursor += 3;

  const properties = {};

  let match;
  while ((match = propertyRegex.exec(fromCursor())) !== null) {
    cursor += match[0].length;
    properties[match[1].toLowerCase()] = match[2];
  }

  if (
    !isCorrectType<RawSnippetType>(properties, [
      "title",
      "description",
      "author",
      "tags",
    ])
  ) {
    return raise("Invalid properties", snippetPath);
  }

  if (slugify(properties.title) !== name) {
    return raise(
      `slugifyed 'title' property doesn't match snippet file name`,
      snippetPath
    );
  }

  match = headerEndCodeStartRegex.exec(fromCursor());
  if (match === null) {
    return raise("Missing header end '---' or code start '```'", snippetPath);
  }
  cursor += match[0].length;

  match = codeRegex.exec(fromCursor());
  if (match === null) {
    return raise("Missing code block end '```'", snippetPath);
  }
  const code: string = match[1];

  return {
    title: properties.title,
    description: properties.description,
    author: properties.author,
    tags: properties.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    contributors: (properties.contributors ?? "")
      .split(",")
      .map((contributor) => contributor.trim())
      .filter((contributor) => contributor),
    code,
  };
}

const snippetPath = "snippets/";
export function parseAllSnippets() {
  const snippets = {};

  for (const language of readdirSync(snippetPath)) {
    const languagePath = join(snippetPath, language);
    const languageIconPath = join(languagePath, "icon.svg");

    if (!existsSync(languageIconPath)) {
      errored = true;
      raise(`icon for '${language}' is missing`);
      continue;
    }

    const categories: CategoryType[] = [];

    for (const category of readdirSync(languagePath)) {
      if (category === "icon.svg") continue;

      const categoryPath = join(languagePath, category);
      const categorySnippets: SnippetType[] = [];

      for (const snippet of readdirSync(categoryPath)) {
        const snippetPath = join(categoryPath, snippet);
        const snippetContent = readFileSync(snippetPath).toString();
        const snippetFileName = snippet.slice(0, -3);
        const snippetData = parseSnippet(
          snippetPath,
          snippetFileName,
          snippetContent
        );
        if (snippetData === null) {
          errored = true;
          continue;
        }
        categorySnippets.push(snippetData);
      }

      categories.push({
        categoryName: reverseSlugify(category),
        snippets: categorySnippets,
      });
    }

    snippets[language] = categories;
  }

  return [errored, snippets];
}
