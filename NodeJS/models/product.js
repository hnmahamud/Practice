const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('products').updateOne({ _id: new mongodb.ObjectId(this._id)}, {$set: this});
        } else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(response => {
                console.log(response);
                return response;
            }).catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products').find({ _id: new mongodb.ObjectId(prodId)} ).next()
            .then(response => {
                console.log(response);
                return response;
            }).catch(error => {
                console.log(error);
            })
    }

    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId)} )
            .then(response => {
                console.log('Deleted!');
            }).catch(error => {
                console.log(error);
            })
    }
}

module.exports = Product;
