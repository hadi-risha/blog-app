import BlogModel from "../models/BlogModel.js";
import UserModel from "../models/userModel.js";
import { uploadImageToS3 } from "../utils/s3Service.js";



export const fetchProfile = async (req, res) => {
    let token = req.header("Authorization"); 
    const { _id } = req.userData;
    try {
        // const user = await UserModel.findById(_id);
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }

        const profile = await UserModel.findById(_id);
        if (!profile) {
          console.log("No details were found in the user profile", profile);
        } else {
          profile.password = undefined; // Remove password from the object
        }

        const blogCount = await BlogModel.countDocuments({ userId: _id });

        return res.status(200).json({ message: "User profile fetched successfully",  profile, blogCount });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "An error occurred while fetching the profile" });
    }
};


export const updateProfile = async (req, res) => {
  try {
    const { name, imageStatus } = req.body;
    const profilePicFile = req.file;
    const userId = req.userData._id;

    if (!name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Fetch the existing profile
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle Image Changes
    if (imageStatus === "updated" && profilePicFile) {
      const { url, key } = await uploadImageToS3(profilePicFile);
      user.image = { url, key };
    } else if (imageStatus === "deleted") {
      console.log("Deleting image...");
      await UserModel.updateOne({ _id: userId }, { $unset: { image: "" } }); // Correct way to delete the field
    }

    user.name = name;
    const updatedProfile = await user.save();

    res.status(200).json({ message: "Profile updated", updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const createBlog = async (req, res) => {
    const { title, content } = req.body;
    console.log("increate blog controller -> title, content ", title, content);

    const coverImageFile = req.file;
    console.log("blog cover image:- ", coverImageFile);

    if (!title) {
        return res.status(400).json({ message: "Title required" });
    }
    if (!content) {
        return res.status(400).json({ message: "Content required" });
    }
    if (!coverImageFile) {
        return res.status(400).json({ message: 'Cover image is required' });
    }
    if (!title.trim() || !content.trim()) {
        return res.status(400).json({ message: "Field cannot be empty" });
    }

    try {
        let token = req.header("Authorization");
        console.log("in create blog controller -> token", token);
        const { _id } = req.userData;
        console.log("in create blog controller -> id", _id);
        
        const { url: coverImageUrl, key: coverImageKey } = await uploadImageToS3(coverImageFile);
        console.log(" image url from  s3:- ", coverImageUrl);
        console.log(" image key from  s3:- ", coverImageKey);

        const blogData = {
          title,
          content,
          image: {
            url: coverImageUrl,
            key: coverImageKey,
          },
          userId: _id,
        };
        const newBlog = new BlogModel(blogData); 
        const blog = await newBlog.save(); 
        return res.status(201).json({ message: "Blog successfully created", blog });
    } catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).json({ message: "An error occurred while creating blog" });
    }
};


// export const updateBlog = async (req, res) => {
//     const { title, content, imageStatus, blogId } = req.body;

//     const coverImageFile = req.file;
//     console.log("blog cover image:- ", coverImageFile);

//     if (!title) {
//         return res.status(400).json({ message: "Title required" });
//     }
//     if (!content) {
//         return res.status(400).json({ message: "Content required" });
//     }
//     if (!coverImageFile) {
//         return res.status(400).json({ message: 'Cover image is required' });
//     }
//     if (!title.trim() || !content.trim()) {
//         return res.status(400).json({ message: "Field cannot be empty" });
//     }

//     try {
//         let token = req.header("Authorization");
//         const { _id, role } = req.userData;

//         const imageUnchanged = imageStatus === "unchanged";
//         const deleteCoverImage = imageStatus === "deleted";
//         const updateCoverImage = imageStatus === "updated";
//         console.log("imageUnchanged:- ", imageUnchanged);
//         console.log("updateProfilePic:- ", updateCoverImage);
//         console.log("deleteProfilePic:- ", deleteCoverImage);

//         const existingBlog = await BlogModel.findById(blogId);
//         if (!existingBlog) {
//             return res.status(404).json({ message: "Blog doesn't exist" });
//         }
//         console.log("already exist image from db:- " , existingBlog?.image?.key);
            
//         // upload the profile picture to S3 if new image provided
//         let coverImageUrl = '';
//         if (coverImageFile && updateCoverImage) {
//         console.log("profile pic changed");
//         const { url: coverImageUrl, key: coverImageKey } = await uploadImageToS3(coverImageFile);

//         existingBlog.image = {
//             url: coverImageUrl,
//             key: coverImageKey,
//         };
//         console.log("cover image uploaded in s3:- ", coverImageKey);
//         } else if (imageUnchanged) {
//             console.log("cover image not changed");
//             existingBlog.image = {
//             url: existingBlog.image?.url,
//             key: existingBlog.image?.key,
//             };
//         }else{
//         console.log("something went wrong in image upload", coverImageUrl);
//         }    

//         existingBlog.title = title ?? existingBlog.title; 
//         existingBlog.content = content ?? existingBlog.content; 

//         const updatedBlog = await BlogModel.findByIdAndUpdate(existingBlog._id, existingBlog, { new: true }).exec();
//         if (!updatedBlog) {
//         console.log("Blog not found");
//         throw new Error("Blog not found");
//         }

//         return res.status(200).json({ message: "Blog Details successfully updated", updatedBlog });
//     } catch (error) {
//         console.error("Error creating blog:", error);
//         return res.status(500).json({ message: "An error occurred while updating blog", error: error.message});
//     }
// };

export const updateBlog = async (req, res) => {
  const { title, content, imageStatus, blogId } = req.body;
  const coverImageFile = req.file;

  try {
    let token = req.header("Authorization");
    const { _id } = req.userData;

    // Find the existing blog
    const existingBlog = await BlogModel.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog doesn't exist" });
    }

    console.log("Existing blog image:", existingBlog.image);

    // **Handle Image Upload or Retain Existing One**
    let coverImageUrl = existingBlog.image?.url;
    let coverImageKey = existingBlog.image?.key;

    if (imageStatus === "updated" && coverImageFile) {
      console.log("New image uploaded");
      const { url, key } = await uploadImageToS3(coverImageFile);
      coverImageUrl = url;
      coverImageKey = key;
    } else if (imageStatus === "deleted") {
      console.log("Image deleted");
      coverImageUrl = "";
      coverImageKey = "";
    } else {
      console.log("Keeping old image");
    }

    // **Update Only Fields That Were Provided**
    existingBlog.title = title?.trim() || existingBlog.title;
    existingBlog.content = content?.trim() || existingBlog.content;
    existingBlog.image = {
      url: coverImageUrl,
      key: coverImageKey,
    };

    // **Save Updated Blog**
    const updatedBlog = await existingBlog.save();

    return res
      .status(200)
      .json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the blog" });
  }
};



export const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    let token = req.header("Authorization");
    const { id, role } = req.userData;

    const existingBlog = await BlogModel.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog doesn't exist" });
    }
    
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
    
    return res
      .status(200)
      .json({ message: "Blog successfully deleted", deletedBlog });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res
      .status(500)
      .json({
        message: "An error occurred deleting the blog",
        error: error.message,
      });
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find()
      .populate("userId", "name image") // Fetch user name & image
      .sort({ createdAt: -1 }); // Sort by latest blogs

    return res
      .status(200)
      .json({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({
      message: "An error occurred while fetching blogs",
      error: error.message,
    });
  }
};



export const getMyBlogs = async (req, res) => {
  try {
    const { _id } = req.userData; // Extract user ID from the authenticated request

    const blogs = await BlogModel.find({ userId: _id }).sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ message: "Your blogs fetched successfully", blogs });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return res.status(500).json({
      message: "An error occurred while fetching my blogs",
      error: error.message,
    });
  }
};


export const getSingleBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Find blog and populate author details (name, email, image)
    const blog = await BlogModel.findById(blogId)
      .populate("userId", "name email image")
      .lean(); // Convert Mongoose document to plain object

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the blog",
      error: error.message,
    });
  }
};

