import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/HeaderNavbar";
import Home from "./pages/home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import MyBlogs from "./pages/MyBlogs";
import MyBlog from "./pages/MyBlog";
import UpdateBlog from "./pages/UpdateBlog";
import CreateBlog from "./pages/CreateBlog";
import { useUserData } from "./context/userDataProvider";
import { Toaster } from "react-hot-toast";
import UpdateProfile from "./pages/UpdateProfile";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Header />}
      {!isAuthPage && <Navbar />}
      <main className={!isAuthPage ? "pt-32" : ""}>{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
};

function App() {
  const { userData } = useUserData();
  const token = localStorage.getItem("token"); // ✅ Check token instead of ID
  const user = userData || token; // ✅ Prioritize userData but fallback to token

  return (
    <div className="App bg-[#1D503A]">
      <Layout>
        <Routes>
          {/* ✅ Protected Routes (Only for Authenticated Users) */}
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/post/:id"
            element={user ? <Post /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/update-profile"
            element={user ? <UpdateProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-blogs"
            element={user ? <MyBlogs /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-blog/:id"
            element={user ? <MyBlog /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit-blog/:id"
            element={user ? <UpdateBlog /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-blog"
            element={user ? <CreateBlog /> : <Navigate to="/login" />}
          />

          {/* ✅ Public Routes (Only for Unauthenticated Users) */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />

          {/* ✅ Catch-all Route (Redirect based on auth state) */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </Layout>
      <Toaster />
    </div>
  );
}

export default App;
