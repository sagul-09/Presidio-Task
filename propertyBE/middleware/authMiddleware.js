import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "asdfghjkl";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, Access denied. No token provided" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
}

const roleMiddleware = role => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: `Forbidden, you do not have the required permissions as a ${role}` });
    }
    next();
}

export { authMiddleware, roleMiddleware };
