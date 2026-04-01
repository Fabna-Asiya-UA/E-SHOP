import { useState, useEffect } from "react";
import API from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("products/")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  function addToCart(productId) {
    API.post("cart/add/", {
      product_id: productId,
      quantity: 1,
    })
      .then(() => alert("Added to Cart"))
      .catch(err => console.log(err));
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >

            <img
              src={`http://127.0.0.1:8000${p.image}`}
              alt={p.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">

              <h3 className="text-lg font-semibold">{p.name}</h3>

              <p className="text-gray-500 text-sm line-clamp-2">
                {p.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-green-600">
                  ₹{p.price}
                </span>

                <button
                  onClick={() => addToCart(p.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;