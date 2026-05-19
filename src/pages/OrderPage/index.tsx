import OrderList from "./orders-list/OrderList";

const OrderPage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>주문 히스토리</h1>
        <OrderList></OrderList>
      </div>
    </div>
  );
};

export default OrderPage;
