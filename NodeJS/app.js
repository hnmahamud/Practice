const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controllers/error');
const User = require('./models/user');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
    User.findById('5e8c299547e3c908b4b1b2ec')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(error => {
            console.log(error);
        });
});

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use(errorController.get404);

mongoose.connect('mongodb://127.0.0.1:27017/shop')
    .then(response => {
        console.log('Connected!');
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'HN',
                        email: 'hnmahamud@gmail.com',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
            });
        app.listen(3000);
    }).catch(error => {
        console.log(error);
});