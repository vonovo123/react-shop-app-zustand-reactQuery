import { Link, useParams } from "react-router-dom";
import styles from "./DetailPage.module.scss";
import { useCartStore } from "../../store/cart/cart.store";
import { useShallow } from "zustand/shallow";
import { useProductQuery } from "../../queries/products.query";
import type { IProduct } from "../../types/product.type";
import QueryLoading from "../../components/query/QueryLoading";
import QueryError from "../../components/query/QueryError";
const DetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);

  //zustand  
  //const { product, isLoading,fetchProduct } = useProductStore()
  const emptyProduct: IProduct = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
    quantity: 0,
    total: 0,
  };
  const {
    data:product = emptyProduct,
    isPending,
    isError,
    error,
    refetch,
  } = useProductQuery(productId);
  
  
  const {productMatching, addToCart} =
  useCartStore(useShallow((s) => ({productMatching: s.products.some((p) => p.id === product.id), addToCart : s.addToCart})));
  const onClickAddCart = () => {
    addToCart(product);
  };
  
  if(isPending) {
    return <QueryLoading variant="spinner" />;
  }

  if(isError) {
    return <QueryError message="상품을 조회하는데 실패했습니다." error={error} onRetry={()=>{
        refetch();
    }} />;
  }
  return (
    <div className="page">
          <div className={styles.card_wrapper}>
          <div className={styles.card_img}>
            <img src={product.image} alt={product.title} />
          </div>
          <div className={styles.card_description}>
            <h3>{product.category}</h3>
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <div>
              <button
                disabled={productMatching}
                onClick={() => !productMatching && onClickAddCart()}
              >
                {productMatching ? "이미 담긴 상품입니다" : " 장바구니에 추가"}
              </button>
              <Link to="/cart">장바구니로 이동</Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
