import { useState } from "react";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
import { useUserData } from "../context/userDataProvider";
import { useNavigate } from "react-router-dom"; 

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	// const { setAuthUser } = useAuthContext();
	const { setUserData } = useUserData();
	const navigate = useNavigate();


	const signup = async ({ name, email, password, confirmPassword }) => {
		const success = handleInputErrors({ name, email, password, confirmPassword });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password, confirmPassword }),
			});

			const data = await res.json();
			console.log("data in signup", data);
			
			if (!res.ok) {
				throw new Error(data.message || "Signup failed");
			}
			localStorage.setItem("user", JSON.stringify(data.userData));
			localStorage.setItem("token", JSON.stringify(data.token));
			localStorage.setItem("id", JSON.stringify(data.userData._id));
			setUserData(data.userData);

			toast.success("Signup successful!"); // ✅ Show success message
      		setTimeout(() => navigate("/"), 2000);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ name, email, password, confirmPassword }) {
  const nameRegex = /^[A-Za-z\s]+$/; // Name should only contain letters and spaces
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation

  if (!name || !email || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (!nameRegex.test(name)) {
    toast.error("Name should only contain letters and spaces");
    return false;
  }

  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters long");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
}
