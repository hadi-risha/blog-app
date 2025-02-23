import express  from "express";
import multer from "multer";
import { verifyToken } from "../middleware/verifyUserToken.js";
import { createBlog, deleteBlog, fetchProfile, getAllBlogs, getMyBlogs, getSingleBlog, updateBlog, updateProfile } from "../controllers/userController.js";


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/profile", verifyToken, fetchProfile); 
router.put('/profile', verifyToken, upload.single('profilePic'), updateProfile);  // profilePic - should matches the field name in  frontend


router.post('/blog', verifyToken, upload.single('coverImage'), createBlog); 
router.get("/blogs", verifyToken, getAllBlogs);  
router.get("/blog/:blogId", verifyToken, getSingleBlog); 
router.get("/my-blogs", verifyToken, getMyBlogs); 
router.delete("/blog/:blogId", verifyToken, deleteBlog);  
router.put('/blog', verifyToken, upload.single('coverImage'), updateBlog);  



export default router;






