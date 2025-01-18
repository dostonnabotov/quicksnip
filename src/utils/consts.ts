import { AppState, CategoryType, LanguageType } from "@types";

export const defaultLanguage: LanguageType = {
  name: "JAVASCRIPT",
  icon: "/icons/javascript.svg",
  subLanguages: [],
};

export const defaultCategoryName: CategoryType["name"] = "All Snippets";

// TODO: add custom loading and error handling
export const defaultState: AppState = {
  language: defaultLanguage,
  setLanguage: () => {},
  category: defaultCategoryName,
  setCategory: () => {},
  snippet: null,
  setSnippet: () => {},
  searchText: "",
  setSearchText: () => {},
};
