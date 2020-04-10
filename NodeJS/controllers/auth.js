const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    // isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        // isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
          console.log('Email do not match!');
          return res.redirect('/login');
      }
      bcrypt.compare(password, user.password)
          .then(doMatch => {
              if (doMatch) {
                  console.log('Login Successful!');
                  req.session.isLoggedIn = true;
                  req.session.user = user;
                  return req.session.save((error) => {
                      console.log(error);
                      res.redirect('/');
                  });
              }
              console.log('Password do not match!');
              return res.redirect('/login');
          })
          .catch(error => {
              console.log(error);
          });
    })
    .catch(error => {
        console.log(error)
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                console.log('Email already exist');
                return res.redirect('/');
            }
            return bcrypt.hash(password, 12)
                .then(hashPass => {
                    const user = new User({
                        email: email,
                        password: hashPass,
                        cart: { items: [] }
                    });
                    return user.save()
                })
                .then(response => {
                    return res.redirect('/login');
                });
        })
        .catch(error => {
            console.log(error);
        });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
