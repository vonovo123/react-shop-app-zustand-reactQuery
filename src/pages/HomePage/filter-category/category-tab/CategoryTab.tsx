import styles from "./categoryTab.module.scss";
import { setActiveCategory } from "../../../../store/categories/categories.slice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduct";
import type { CategoriesNames } from "../../../../store/categories/categories.type";
type CategoryTabPros = {
  text: string;
  categoryName: CategoriesNames;
};
const CategoryTab = ({ text, categoryName }: CategoryTabPros) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categoriesSlice);
  const handleClickCategory = () => {
    dispatch(setActiveCategory(categoryName));
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
