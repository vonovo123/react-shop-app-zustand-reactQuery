import OrderList from "./orders-list/OrderList";

const OrderPage = () => {
  return (
    <div className="page">
      <div className="container">
        <header className="page_header">
          <h1>주문 히스토리</h1>
          <p>지난 주문 내역을 확인할 수 있습니다.</p>
        </header>
        <OrderList />
      </div>
    </div>
  );
};

export default OrderPage;
