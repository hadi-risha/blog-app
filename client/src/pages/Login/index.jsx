import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  

  return (
    <>
      <div className="bg-[#FAF6EF] min-h-screen w-full overflow-x-hidden flex items-center justify-center">
        <div className="container">
          <div className="heading">Sign In</div>
          <form action="" className="form" onSubmit={handleSubmit}>
            <input
              required=""
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required=""
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <input className="login-button" type="submit" value="Sign In" /> */}
            <button
              className="w-full mt-4 py-4 text-white font-bold bg-[#1896e4] rounded-2xl flex items-center justify-center 
             transition-all duration-300 ease-in-out hover:bg-blue-500 hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="social-account-container">
            <span className="title">Don't have an account?</span>

            <div className="social-accounts">
              <Link to="/signup" className="text-blue-500 underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
