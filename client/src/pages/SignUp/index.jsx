import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";


const SignUp = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  

  return (
    <>
      <div className="bg-[#FAF6EF] min-h-screen w-full overflow-x-hidden flex items-center justify-center">
        <div className="container">
          <div className="heading">Sign Up</div>
          <form action="" className="form" onSubmit={handleSubmit}>
            <input
              required=""
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
            <input
              required=""
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <input
              required=""
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
            <input
              required=""
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
            {/* <input className="login-button" type="submit" value="Sign Up" /> */}
            <button
              className="w-full mt-4 py-4 text-white font-bold bg-[#1896e4] rounded-2xl flex items-center justify-center 
             transition-all duration-300 ease-in-out hover:bg-blue-500 hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="social-account-container">
            <span className="title">Already have an account?</span>

            <div className="social-accounts">
              <Link to="/login" className="text-blue-500 underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
