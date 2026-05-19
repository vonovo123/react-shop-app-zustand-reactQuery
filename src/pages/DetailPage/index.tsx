import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../../store/products/product.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduct";
import styles from "./DetailPage.module.scss";
import Loader from "../../components/loader/Loader";
import { addToCart } from "../../store/cart/cart.slice";
const DetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useAppDispatch();
  const { product, isLoading } = useAppSelector((state) => state.productSlice);

  const { products } = useAppSelector((state) => state.cartSlice);
  const onClickAddCart = () => {
    dispatch(addToCart(product));
  };
  const productMatching = products.some((item) => item.id === product.id);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [productId]);

  return (
    <div className="page">
      {isLoading ? (
        <Loader />
      ) : (
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
                onClick={() => !productMatching && onClickAddCart}
              >
                {productMatching ? "이미 담긴 상품입니다" : " 장바구니에 추가"}
              </button>
              <Link to="/cart">장바구니로 이동</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
