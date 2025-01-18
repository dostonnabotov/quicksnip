import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAppContext } from "@contexts/AppContext";
import { useCategories } from "@hooks/useCategories";
import { defaultCategoryName } from "@utils/consts";
import { slugify } from "@utils/slugify";

interface CategoryListItemProps {
  name: string;
}

const CategoryListItem: FC<CategoryListItemProps> = ({ name }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { language, category } = useAppContext();

  const handleSelect = () => {
    navigate({
      pathname: `/${slugify(language.name)}/${slugify(name)}`,
      search: searchParams.toString(),
    });
  };

  return (
    <li className="category">
      <button
        className={`category__btn ${
          slugify(name) === slugify(category) ? "category__btn--active" : ""
        }`}
        onClick={handleSelect}
      >
        {name}
      </button>
    </li>
  );
};

const CategoryList = () => {
  const { fetchedCategories, loading, error } = useCategories();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error}</div>;
  }

  return (
    <ul role="list" className="categories">
      <CategoryListItem name={defaultCategoryName} />
      {fetchedCategories.map((name, idx) => (
        <CategoryListItem key={idx} name={name} />
      ))}
    </ul>
  );
};

export default CategoryList;
