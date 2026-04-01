import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login() {
    API.post("token/", {
      username: username,
      password: password,
    })
      .then(res => {
        localStorage.setItem("token", res.data.access);
        alert("Login Successful");
        navigate("/home");   
      })
      .catch(err => {
        alert("Invalid credentials");
        console.log(err);
      });
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-80">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={login}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-sm text-center mt-3">
        Don’t have an account? 
        <span 
            onClick={() => navigate("/register")} 
            className="text-blue-500 cursor-pointer"
        >
            Register
        </span>
        </p>

      </div>
    </div>
  );
}

export default Login;