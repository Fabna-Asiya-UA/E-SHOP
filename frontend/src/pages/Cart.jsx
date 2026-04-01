import { useState, useEffect } from "react";
import API from "../services/api";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    API.get("cart/")  
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  };

  const removeItem = (cartItemId) => {
    API.delete("cart/remove/", {
      data: { cart_item_id: cartItemId },
    })
      .then(() => {
        alert("Item Removed");
        fetchCart();
      })
      .catch(err => console.log(err));
  };

  const handleCheckout = () => {
    API.post("order/create/")   
      .then(() => {
        alert("Order placed successfully!!");
        fetchCart();
      })
      .catch(err => console.log(err));
  };

  if (!cart || !cart.items) return <h2>Loading...</h2>;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div 
              key={item.id} 
              className="flex justify-between items-center bg-white p-4 rounded shadow mb-3"
            >
              <div>
                 <img
                  src={`http://127.0.0.1:8000${item.product.image}`}
                  alt={item.product.name}
                  className="h-20 w-20 object-cover rounded"
                />
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-500">₹{item.product.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>

              <button 
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;