import styles from "./CategoryTab.module.scss";
import {useCategoriesStore} from "../../../../store/categories/categories.store";
import type { CategoriesNames } from "../../../../types/category.type";
type CategoryTabPros = {
  text: string;
  categoryName: CategoriesNames;
};
const CategoryTab = ({ text, categoryName }: CategoryTabPros) => {
  const {setActiveCategory, category} = useCategoriesStore();
  const handleClickCategory = () => {
    setActiveCategory(categoryName);
  };
  return (
    <button
      className={
        categoryName == category
          ? styles.active_category
          : styles.category_button
      }
      onClick={handleClickCategory}
    >
      {text}
    </button>
  );
};

export default CategoryTab;
