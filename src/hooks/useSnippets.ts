import { useMemo } from "react";

import { useAppContext } from "@contexts/AppContext";
import { SnippetType } from "@types";
import { defaultCategory } from "@utils/consts";
import { slugify } from "@utils/helpers/slugify";

import { useFetch } from "./useFetch";

type CategoryData = {
  categoryName: string;
  snippets: SnippetType[];
};

export const useSnippets = () => {
  const { language, category, searchText } = useAppContext();
  const { data, loading, error } = useFetch<CategoryData[]>(
    `/consolidated/${slugify(language.lang)}.json`
  );

  const fetchedSnippets = useMemo(() => {
    if (!data) {
      return [];
    }

    if (category === defaultCategory) {
      if (searchText) {
        return data
          .flatMap((item) => item.snippets)
          .filter((item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase())
          );
      }
      return data.flatMap((item) => item.snippets);
    }

    if (searchText) {
      return data
        .find((item) => item.categoryName === category)
        ?.snippets.filter((item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        );
    }
    return data.find((item) => item.categoryName === category)?.snippets;
  }, [category, data, searchText]);

  return { fetchedSnippets, loading, error };
};
