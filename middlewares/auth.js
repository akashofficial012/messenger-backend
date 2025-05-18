import jwt from "jsonwebtoken";
import { TryCatch } from "./error.js"; // Correct extension

const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies["chattu-token"]; // Correct token access
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
});

export { isAuthenticated };
