import { createContext, FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useLanguages } from "@hooks/useLanguages";
import { AppState, LanguageType, SnippetType } from "@types";
import { configureUserSelection } from "@utils/configureUserSelection";
import { defaultLanguage, defaultState } from "@utils/consts";
import { slugify } from "@utils/slugify";

const AppContext = createContext<AppState>(defaultState);

export const AppProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { languageName, categoryName } = useParams();

  const { fetchedLanguages } = useLanguages();

  const [language, setLanguage] = useState<LanguageType | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [snippet, setSnippet] = useState<SnippetType | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const configure = async () => {
    const { language, category } = await configureUserSelection({
      languageName,
      categoryName,
    });

    setLanguage(language);
    setCategory(category);
  };

  useEffect(() => {
    configure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedLanguages, languageName, categoryName]);

  /**
   * Set the default language if the language is not found in the URL.
   */
  useEffect(() => {
    if (languageName === undefined) {
      navigate(`/${slugify(defaultLanguage.name)}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (language === null || category === null) {
    return <div>Loading...</div>;
  }

  return (
    <AppContext.Provider
      value={
        {
          language,
          setLanguage,
          category,
          setCategory,
          snippet,
          setSnippet,
          searchText,
          setSearchText,
        } as AppState
      }
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
