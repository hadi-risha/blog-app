import { useState } from "react";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
import { useUserData } from "../context/userDataProvider";
import { useNavigate } from "react-router-dom"; 


const useLogin = () => {
  const [loading, setLoading] = useState(false);
  // const { setAuthUser } = useAuthContext();
  const { setUserData } = useUserData();
  const navigate = useNavigate();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("user", JSON.stringify(data.userData));
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("id", JSON.stringify(data.userData._id));
      setUserData(data.userData);

      toast.success("SignIn successful!"); // ✅ Show success message
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation

  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  return true;
}
