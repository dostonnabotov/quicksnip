import { createContext, FC, useContext, useState } from "react";

import { AppState, LanguageType, SnippetType } from "@types";
import { defaultCategory, defaultLanguage } from "@utils/consts";

// TODO: add custom loading and error handling
const defaultState: AppState = {
  language: defaultLanguage,
  setLanguage: () => {},
  category: defaultCategory,
  setCategory: () => {},
  snippet: null,
  setSnippet: () => {},
  searchText: "",
  setSearchText: () => {},
};

const AppContext = createContext<AppState>(defaultState);

export const AppProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<LanguageType>(defaultLanguage);
  const [category, setCategory] = useState<string>(defaultCategory);
  const [snippet, setSnippet] = useState<SnippetType | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        category,
        setCategory,
        snippet,
        setSnippet,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
