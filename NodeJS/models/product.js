const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);


// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
//
// class Product {
//     constructor(title, price, description, imageUrl, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }
//
//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             dbOp = db.collection('products').updateOne({ _id: new mongodb.ObjectId(this._id)}, {$set: this});
//         } else {
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp
//             .then(response => {
//                 return response
//             }).catch(error => {
//                 console.log(error);
//             });
//     }
//
//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products').find().toArray()
//             .then(response => {
//                 console.log(response);
//                 return response;
//             }).catch(error => {
//                 console.log(error);
//             });
//     }
//
//     static findById(prodId) {
//         const db = getDb();
//         return db.collection('products').findOne({ _id: new mongodb.ObjectId(prodId)} )
//             .then(response => {
//                 console.log(response);
//                 return response;
//             }).catch(error => {
//                 console.log(error);
//             })
//     }
//
//     static deleteById(prodId) {
//         const db = getDb();
//         return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId)} )
//             .then(response => {
//                 return response;
//             }).catch(error => {
//                 console.log(error);
//             })
//     }
// }
//
// module.exports = Product;
