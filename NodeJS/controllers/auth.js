const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const {validationResult} = require('express-validator/check');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    oldMessage: {
          email: '',
          password: '',
      },
      validationErrors: []
  });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message,
        oldMessage: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationErrors: []
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const error = validationResult(req);
    console.log(error.array());
    if (!error.isEmpty()) {
        return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password!',
            oldMessage: {
                email: email,
                password: password,
            },
            validationErrors: error.array()
        });
    }
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
          return res.status(422).render('auth/login', {
              path: '/login',
              pageTitle: 'Login',
              errorMessage: 'Invalid email or password!',
              oldMessage: {
                  email: email,
                  password: password,
              },
              validationErrors: []
          });
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
              return res.status(422).render('auth/login', {
                  path: '/login',
                  pageTitle: 'Login',
                  errorMessage: 'Invalid email or password!',
                  oldMessage: {
                      email: email,
                      password: password,
                  },
                  validationErrors: []
              });
          })
          .catch(error => {
              console.log(error);
          });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const error = validationResult(req);
    console.log(error.array());
    if (!error.isEmpty()) {
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: error.array()[0].msg,
            oldMessage: {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            },
            validationErrors: error.array()
        });
    }
    bcrypt.hash(password, 12)
        .then(hashPass => {
            const user = new User({
                email: email,
                password: hashPass,
                cart: { items: [] }
            });
            return user.save()
        })
        .then(response => {
            res.redirect('/login');
            return transporter.sendMail({
               to: email,
               from: 'shaon@icmsoft.xyz',
               subject: 'Signup Succeeded!',
               html: '<h1>You Successfully signed up!</h1>'
            })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });

};

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message
    });
};

exports.postReset = (req, res, next) => {
    const email = req.body.email;
    crypto.randomBytes(32, (error, buffer) => {
        if (error) {
            console.log(error);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    req.flash('error', 'No account found with this email!');
                    return res.redirect('/reset');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(response => {
                res.redirect('/');
                transporter.sendMail({
                    to: email,
                    from: 'shaon@icmsoft.xyz',
                    subject: 'Password Reset!',
                    html: `
                        <p>You requested a password reset.</p>
                        <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
                    `
                })
            })
            .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    })
};

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: {$gt: Date.now()} })
        .then(user => {
            let message = req.flash('error');
            if (message.length > 0) {
                message = message[0];
            } else {
                message = null;
            }
            res.render('auth/new-password', {
                path: '/new-password',
                pageTitle: 'New Password',
                errorMessage: message,
                userId: user._id.toString(),
                passwordToken: token
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken= req.body.passwordToken;
    let resetUser;
    User.findOne({ resetToken: passwordToken, resetTokenExpiration: { $gt: Date.now() }, _id: userId })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then(response => {
            res.redirect('/login');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
