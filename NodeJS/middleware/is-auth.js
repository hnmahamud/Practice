module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        console.log('Please login first!');
        return res.redirect('/login');
    }
    next();
};