import { CategoryType, LanguageType } from "@types";

import { defaultCategoryName, defaultLanguage } from "./consts";
import { slugify } from "./slugify";

export async function configureUserSelection({
  languageName,
  categoryName,
}: {
  languageName: string | undefined;
  categoryName?: string | undefined;
}): Promise<{ language: LanguageType; category: CategoryType["name"] }> {
  const slugifiedLanguageName = languageName
    ? slugify(languageName)
    : undefined;
  const slugifiedCategoryName = categoryName
    ? slugify(categoryName)
    : undefined;

  const fetchedLanguages: LanguageType[] = await fetch(
    "/consolidated/_index.json"
  ).then((res) => res.json());

  const language =
    fetchedLanguages.find(
      (lang) => slugify(lang.name) === slugifiedLanguageName
    ) ?? defaultLanguage;

  let category: CategoryType | undefined;
  try {
    const fetchedCategories: CategoryType[] = await fetch(
      `/consolidated/${slugify(language.name)}.json`
    ).then((res) => res.json());
    category = fetchedCategories.find(
      (item) => slugify(item.name) === slugifiedCategoryName
    );

    if (category === undefined) {
      category = {
        name: defaultCategoryName,
        snippets: fetchedCategories.flatMap((item) => item.snippets),
      };
    }
  } catch (_error) {
    // This state should not be reached in the normal flow.
    category = {
      name: defaultCategoryName,
      snippets: [],
    };
  }

  return { language, category: category.name };
}
