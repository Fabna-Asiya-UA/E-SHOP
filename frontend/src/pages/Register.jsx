import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleRegister() {
    API.post("register/", {
      username: username,
      password: password,
    })
      .then(() => {
        alert("Account created!");
        navigate("login/");
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default Register;