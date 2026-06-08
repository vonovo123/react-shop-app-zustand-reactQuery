import CartEmpty from "../../components/cart-empty/CartEmpty";
import CartList from "./cart_list/CartList";
import { useCartStore } from "../../store/cart/cart.store";

const CartPage = () => {
  const { products } = useCartStore()
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
