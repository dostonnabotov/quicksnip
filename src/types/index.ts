export type LanguageType = {
  lang: string;
  icon: string;
};

export type CategoryType = {
  categoryName: string;
  snippets: SnippetType[];
};

export type SnippetType = {
  title: string;
  description: string;
  code: string;
  tags: string[];
  author: string;
};

export type AppState = {
  language: LanguageType;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  snippet: SnippetType | null;
  setSnippet: React.Dispatch<React.SetStateAction<SnippetType | null>>;
};
