import CartEmpty from "../../components/cart-empty/CartEmpty";
import CartList from "./cart_list/CartList";
import { useCartStore } from "../../store/cart/cart.store";

const CartPage = () => {
  const { products } = useCartStore();
  return (
    <div className="page">
      {!products.length ? (
        <div className="container">
          <CartEmpty title="장바구니" />
        </div>
      ) : (
        <div className="container">
          <header className="page_header">
            <h1>장바구니</h1>
            <p>담은 상품을 확인하고 결제하세요.</p>
          </header>
          <CartList />
        </div>
      )}
    </div>
  );
};

export default CartPage;
