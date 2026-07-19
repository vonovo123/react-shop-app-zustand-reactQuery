import styles from "./OrdersList.module.scss";
import { useAuth } from "../../../hooks/auth";
import CartEmpty from "../../../components/cart-empty/CartEmpty";
import OrderItem from "./order-item/OrderItem";
import { useOrdersQuery } from "../../../queries/orders.query";
import QueryLoading from "../../../components/query/QueryLoading";
import { Navigate } from "react-router-dom";
import QueryError from "../../../components/query/QueryError";
const OrderList = () => {
  const { id } = useAuth();
  const {
    data:orders = [],
    isPending,
    isError,
    error,
    refetch,
  } = useOrdersQuery(id);
  
  if(!id){return <Navigate to="/login" />}

  if(isPending) {
    return <QueryLoading variant="list" />;
  }
  if(isError) {
    return <QueryError message="주문 내역을 불러오지 못했습니다" error={error} onRetry={()=>{
      refetch();
    }} />
  }
  
  if (!orders.length) return <CartEmpty title={"주문내역"}></CartEmpty>;
  
  return (
    <div className={styles.orders}>
      {orders.map((item) => (
        <article key={item.id} className={styles.order_card}>
          <div className={styles.order_header}>
            <h3>주문 번호 {item.id}</h3>
            <p>합계 ${item.totalPrice.toFixed(2)}</p>
          </div>
          <ul className={styles.orders_list}>
            {item.products.map((product) => (
              <OrderItem key={product.id} order={product} />
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

export default OrderList;
