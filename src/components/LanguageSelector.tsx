/**
 * Inspired by https://blog.logrocket.com/creating-custom-select-dropdown-css/
 */

import { useRef, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "@contexts/AppContext";
import { useKeyboardNavigation } from "@hooks/useKeyboardNavigation";
import { useLanguages } from "@hooks/useLanguages";
import { LanguageType } from "@types";
import { configureUserSelection } from "@utils/configureUserSelection";
import { slugify } from "@utils/slugify";

import SubLanguageSelector from "./SubLanguageSelector";

const LanguageSelector = () => {
  const navigate = useNavigate();

  const { language, setSearchText } = useAppContext();
  const { fetchedLanguages, loading, error } = useLanguages();
  const allLanguages = useMemo(
    () =>
      fetchedLanguages.flatMap((lang) =>
        lang.subLanguages.length > 0
          ? [
              lang,
              ...lang.subLanguages.map((subLang) => ({
                ...subLang,
                mainLanguage: lang,
                subLanguages: [],
              })),
            ]
          : [lang]
      ),
    [fetchedLanguages]
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openedLanguages, setOpenedLanguages] = useState<LanguageType[]>([]);

  /**
   * When setting a new language we need to ensure that a category
   * has been set given this new language.
   * Ensure that the search text is cleared.
   */
  const handleSelect = async (selected: LanguageType) => {
    const { language: newLanguage, category: newCategory } =
      await configureUserSelection({
        languageName: selected.name,
      });

    setSearchText("");
    navigate(`/${slugify(newLanguage.name)}/${slugify(newCategory)}`);
    setIsOpen(false);
    setOpenedLanguages([]);
  };

  const { focusedIndex, handleKeyDown, resetFocus, focusFirst } =
    useKeyboardNavigation({
      items: allLanguages,
      isOpen,
      openedLanguages,
      toggleDropdown: (openedLang) => handleToggleSublanguage(openedLang),
      onSelect: handleSelect,
      onClose: () => setIsOpen(false),
    });

  const handleBlur = () => {
    setTimeout(() => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(document.activeElement)
      ) {
        setIsOpen(false);
      }
    }, 0);
  };

  const handleToggleSublanguage = (openedLang: LanguageType) => {
    const isAlreadyOpened = openedLanguages.some(
      (lang) => lang.name === openedLang.name
    );

    if (!isAlreadyOpened) {
      setOpenedLanguages((prev) => [...prev, openedLang]);
    } else {
      setOpenedLanguages((prev) =>
        prev.filter((lang) => lang.name !== openedLang.name)
      );
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      if (!prev) setTimeout(focusFirst, 0);
      return !prev;
    });
  };

  useEffect(() => {
    if (!isOpen) {
      resetFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (language.mainLanguage) {
      handleToggleSublanguage(language.mainLanguage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const element = document.querySelector(
        `.selector__item:nth-child(${focusedIndex + 1})`
      ) as HTMLElement;
      element?.focus();
    }
  }, [isOpen, focusedIndex]);

  if (loading) {
    return <p>Loading languages...</p>;
  }

  if (error) {
    return <p>Error fetching languages: {error}</p>;
  }

  return (
    <div
      className={`selector ${isOpen ? "selector--open" : ""}`}
      ref={dropdownRef}
      onBlur={handleBlur}
    >
      <button
        className="selector__button"
        aria-label="select button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <div className="selector__value">
          <img src={language.icon} alt="" />
          <span>{language.name || "Select a language"}</span>
        </div>
        <span className="selector__arrow" />
      </button>
      {isOpen && (
        <ul
          className="selector__dropdown"
          role="listbox"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {fetchedLanguages.map((lang, index) =>
            lang.subLanguages.length > 0 ? (
              <SubLanguageSelector
                key={index}
                mainLanguage={lang}
                afterSelect={() => {
                  setIsOpen(false);
                }}
                opened={openedLanguages.includes(lang)}
                onDropdownToggle={handleToggleSublanguage}
              />
            ) : (
              <li
                key={lang.name}
                role="option"
                tabIndex={-1}
                onClick={() => handleSelect(lang)}
                className={`selector__item ${
                  language.name === lang.name ? "selected" : ""
                } ${focusedIndex === index ? "focused" : ""}`}
                aria-selected={language.name === lang.name}
              >
                <label>
                  <img src={lang.icon} alt="" />
                  <span>{lang.name}</span>
                </label>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
