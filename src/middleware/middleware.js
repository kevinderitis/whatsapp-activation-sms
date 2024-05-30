export const isAuthenticated = (req, res, next) => {
    if (req.session.user || req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({ error: 'Not authenticated'});
    }
};