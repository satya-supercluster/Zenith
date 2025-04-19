import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../../context/DataContext";

const Login = () => {

  const {setAuth,setIt}=useData();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and Password are required!");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://zenith-club-manit.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data?.token);
      setIt(username);
      setAuth(data?.admin);
    } catch (err) {
      setError(err.message || "Authentication failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="bg-black bg-opacity-30 sm:min-w-[500px] shadow-lg rounded-lg p-6 min-h-[50vh] m-2 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center font-extrabold my-5 sm:my-10 text-blue-200">
          LOGIN
        </h1>
        <h1 className="text-xl max-md:text-lg text-center font-bold my-2 text-green-100">
          Zenith Recruitment Data
        </h1>
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.2 }}
              className="text-red-500 p-2 text-sm lg:text-lg font-semibold my-1 text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full max-w-52 px-4 py-2 border-2 rounded-md border-yellow-500 focus:outline-none focus:border-blue-500 font-bold text-slate-700 text-center my-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full max-w-52 px-4 py-2 border-2 rounded-md border-yellow-500 focus:outline-none focus:border-blue-500 font-bold text-slate-700 text-center my-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded my-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
