import { useAppSelector } from "../../hooks/reduct";
import CartEmpty from "../../components/cart-empty/CartEmpty";
import CartList from "./cart_list/CartList";

const CartPage = () => {
  const { products } = useAppSelector((state) => state.cartSlice);
  return (
    <div className="page">
      {!products.length ? (
        <CartEmpty title="Cart" />
      ) : (
        <div className="container">
          <h1>장바구니</h1>
          <CartList></CartList>
          {/* <Checkout></Checkout> */}
        </div>
      )}
    </div>
  );
};

export default CartPage;
