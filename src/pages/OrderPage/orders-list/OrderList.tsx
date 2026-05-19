import { useEffect } from "react";
import styles from "./OrdersList.module.scss";
import { useAuth } from "../../../hooks/auth";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduct";
import { fetchOrder } from "../../../store/order/order.slice";
import CartEmpty from "../../../components/cart-empty/CartEmpty";
import OrderItem from "./order-item/OrderItem";
const OrderList = () => {
  const dispatch = useAppDispatch();
  const { id } = useAuth();
  const { orders } = useAppSelector((state) => state.orderSlice);
  console.log(orders);
  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [id]);

  if (!orders.length) return <CartEmpty title={"주문내역"}></CartEmpty>;
  return (
    <div className={styles.orders}>
      {orders.map((item) => (
        <div key={item.id}>
          <div className="orders_header">
            <h3>주문 번호_{item.id}</h3>
            <p>합계 : ${item.totalPrice.toFixed(2)}</p>
          </div>
          <ul className={styles.orders_list}>
            {item.products.map((product) => (
              <OrderItem key={product.id} order={product}></OrderItem>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
