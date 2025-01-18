export type LanguageType = {
  name: string;
  icon: string;
  mainLanguage?: LanguageType;
  subLanguages: {
    name: string;
    icon: string;
  }[];
};

export type CategoryType = {
  name: string;
  snippets: SnippetType[];
};

export type SnippetType = {
  title: string;
  description: string;
  author: string;
  code: string;
  tags: string[];
  contributors: string[];
  extension: string;
};

export type RawSnippetType = {
  title: string;
  description: string;
  author: string;
  code: string;
  tags: string;
  contributors?: string;
  extension: string;
};

export type AppState = {
  language: LanguageType;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  snippet: SnippetType | null;
  setSnippet: React.Dispatch<React.SetStateAction<SnippetType | null>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};
