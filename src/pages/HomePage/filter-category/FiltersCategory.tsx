import styles from "./filtersCategory.module.scss";
import CategoryTab from "./category-tab/CategoryTab";
import { CategoriesNames } from "../../../store/categories/categories.type";
const FiltersCategory = () => {
  return (
    <div className={styles.filters_category}>
      <CategoryTab text="모두" categoryName={CategoriesNames.ALL} />
      <CategoryTab text="전자기기" categoryName={CategoriesNames.ELECTRONICS} />
      <CategoryTab text="쥬얼리" categoryName={CategoriesNames.JEWELERY} />
      <CategoryTab
        text="남성 의류"
        categoryName={CategoriesNames.MENS_CLOTHING}
      />
      <CategoryTab
        text="여성 의류"
        categoryName={CategoriesNames.WOMENS_CLOTHING}
      />
    </div>
  );
};

export default FiltersCategory;
