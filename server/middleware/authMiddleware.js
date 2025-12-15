// server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization || req.headers.Authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // id, username, email, userType
        next();
    } catch (err) {
        console.error("Auth middleware:", err.message || err);
        return res.status(401).json({ message: "Token invalid or expired" });
    }
};
export default authMiddleware;
