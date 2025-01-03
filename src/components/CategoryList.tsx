import { FC } from "react";

import { useAppContext } from "@contexts/AppContext";
import { useCategories } from "@hooks/useCategories";
import { defaultCategory } from "@utils/consts";

interface CategoryListItemProps {
  name: string;
}

const CategoryListItem: FC<CategoryListItemProps> = ({ name }) => {
  const { category, setCategory } = useAppContext();

  return (
    <li className="category">
      <button
        className={`category__btn ${
          name === category ? "category__btn--active" : ""
        }`}
        onClick={() => setCategory(name)}
      >
        {name}
      </button>
    </li>
  );
};

const CategoryList = () => {
  const { fetchedCategories, loading, error } = useCategories();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error occurred: {error}</div>;

  return (
    <ul role="list" className="categories">
      <CategoryListItem name={defaultCategory} />
      {fetchedCategories.map((name, idx) => (
        <CategoryListItem key={idx} name={name} />
      ))}
    </ul>
  );
};

export default CategoryList;
