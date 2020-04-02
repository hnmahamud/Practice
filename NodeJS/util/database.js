const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb://127.0.0.1:27017/shop')
      .then(response => {
        console.log('Connected!');
        _db = response.db();
        callback();
      }).catch(error => {
        console.log(error);
        throw error;
  });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
