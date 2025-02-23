import jwt from 'jsonwebtoken';
import UserModel from "../models/userModel.js";


export const verifyToken = async (req, res, next) => {
    try {
      let token = req.header("Authorization");

      if (!token) {
        console.log("access denied, no token provided");
        return res
          .status(401)
          .json({ message: "access denied, no token provided" });
      }

      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res
          .status(500)
          .json({ message: "JWT secret is not defined in env" });
      }

      //verify the token using the secret
      const verified = jwt.verify(token, secret);
    //   console.log("token verified", verified);

      // Check if user exists in database
      const user = await UserModel.findById(verified._id);
      if (!user) {
        console.log("User not found in database");
        return res.status(404).json({ message: "User not found" });
      }

      // Attach user to `req.user`
      req.userData = verified; // Now we can access `req.userData._id` in routes

      next();
    } catch (err) {
      console.error("JWT Verification Error:", err); // ✅ Log the actual error

      if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(500).json({ error: "an unknown error occurred" });
    }
};



