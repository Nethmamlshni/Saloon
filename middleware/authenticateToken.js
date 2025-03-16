import jwt from "jsonwebtoken";
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get the token from Authorization header
    if (!token) return res.status(401).send("Access denied, token missing.");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send("Token is invalid.");
        req.user = user; // Attach user to request object
        next();
    });
};

export default authenticateToken;