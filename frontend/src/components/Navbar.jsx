import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);   
    alert("Logged Out");
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-gray-900 text-white px-4 py-4 flex justify-between items-center shadow-md">
      
      <h2 className="text-2xl font-bold text-white">E-Shop</h2>

      <div className="flex gap-6 items-center">

        {isLoggedIn && (
          <>
            <Link to="/home" className="hover:text-gray-300">Home</Link>
            <Link to="/cart" className="hover:text-gray-300">Cart</Link>
            <Link to="/orders" className="hover:text-gray-300">Orders</Link>
          </>
        )}

        {isLoggedIn ? (
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        )}

      </div>
    </div>
  );
}

export default Navbar;