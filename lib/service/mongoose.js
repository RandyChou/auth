var config = require('../config');
var mongoose = require('mongoose');

var path = "mongodb://" + config.mongodb.userName + ":" + config.mongodb.passWord + "@" + config.mongodb.host + ":" + config.mongodb.port + "/" + config.mongodb.db + "?poolSize=" + config.mongodb.poolSize;

mongoose.connect(path, function(err) {
    if(err) {
        console.log(err);
    }
});

export default mongoose;