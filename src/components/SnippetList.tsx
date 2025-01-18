import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppContext } from "@contexts/AppContext";
import { useSnippets } from "@hooks/useSnippets";
import { SnippetType } from "@types";
import { QueryParams } from "@utils/enums";
import { slugify } from "@utils/slugify";

import { LeftAngleArrowIcon } from "./Icons";
import SnippetModal from "./SnippetModal";

const SnippetList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const { language, snippet, setSnippet } = useAppContext();
  const { fetchedSnippets } = useSnippets();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = (selected: SnippetType) => () => {
    setIsModalOpen(true);
    setSnippet(selected);
    searchParams.set(QueryParams.SNIPPET, slugify(selected.title));
    setSearchParams(searchParams);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSnippet(null);
    searchParams.delete(QueryParams.SNIPPET);
    setSearchParams(searchParams);
  };

  /**
   * open the relevant modal if the snippet is in the search params
   */
  useEffect(() => {
    const snippetSlug = searchParams.get(QueryParams.SNIPPET);
    if (!snippetSlug) {
      return;
    }

    const selectedSnippet = (fetchedSnippets ?? []).find(
      (item) => slugify(item.title) === snippetSlug
    );
    if (selectedSnippet) {
      handleOpenModal(selectedSnippet)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedSnippets, searchParams]);

  if (!fetchedSnippets) {
    return (
      <div>
        <LeftAngleArrowIcon />
      </div>
    );
  }

  return (
    <>
      <motion.ul role="list" className="snippets">
        <AnimatePresence mode="popLayout">
          {fetchedSnippets.map((snippet, _idx) => {
            const uniqueId = `${language.name}-${snippet.title}`;
            return (
              <motion.li
                key={uniqueId}
                layoutId={uniqueId}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    // delay: shouldReduceMotion ? 0 : 0.09 + idx * 0.05,
                    duration: shouldReduceMotion ? 0 : 0.2,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  transition: {
                    // delay: idx * 0.01,
                    duration: shouldReduceMotion ? 0 : 0.09,
                  },
                }}
                transition={{
                  ease: [0, 0.75, 0.25, 1],
                  duration: shouldReduceMotion ? 0 : 0.25,
                }}
              >
                <motion.button
                  className="snippet | flow"
                  data-flow-space="sm"
                  onClick={handleOpenModal(snippet)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="snippet__preview">
                    <img src={language.icon} alt={language.name} />
                  </div>
                  <h3 className="snippet__title">{snippet.title}</h3>
                </motion.button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence mode="wait">
        {isModalOpen && snippet && (
          <SnippetModal
            snippet={snippet}
            handleCloseModal={handleCloseModal}
            language={snippet.extension}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SnippetList;
