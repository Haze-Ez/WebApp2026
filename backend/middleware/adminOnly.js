/**
 * Admin Only Middleware
 * Must be used AFTER authMiddleware.
 * Rejects any user whose role is not 'admin' with a 403.
 */
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = adminOnly;
