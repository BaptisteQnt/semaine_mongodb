module.exports = (req, res, next) => {
    if (!req.session.userId) {
      req.session.redirectTo = req.originalUrl;
      return res.redirect('/login');
    }
    next();
  };
  