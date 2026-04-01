import { useState, useEffect } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    API.get("orders/")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  if (!orders) return <h2>Loading...</h2>;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Yet</p>
      ) : (
        orders.map(order => (
          <div
            key={order.id}
            className="bg-white p-4 rounded shadow mb-4"
          >

            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                Order #{order.id}
              </h3>

              <span className={
                order.status === "Delivered"
                  ? "text-green-600"
                  : "text-yellow-500"
              }>
                {order.status}
              </span>
            </div>

            <p className="text-gray-600 mt-1">
              Total: ₹{order.total_price}
            </p>

            <p className="text-sm text-gray-400">
              {new Date(order.created_at).toLocaleString()}
            </p>

            <div className="mt-3">
              <h4 className="font-semibold mb-2">Items:</h4>

              {order.items && order.items.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-2"
                >

                  <div className="flex items-center gap-3">

                    {item.product?.image && (
                      <img
                        src={`http://127.0.0.1:8000${item.product.image}`}
                        alt={item.product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    )}

                    <span>{item.product?.name}</span>
                  </div>

                  <span>
                    {item.quantity} × ₹{item.price}
                  </span>

                </div>
              ))}

            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default Orders;