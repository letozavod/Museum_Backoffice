const { Schema, model } = require('mongoose')
const crypto = require('crypto');

const user = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: false
    },
    salt: {
        type: String
    },
    god: {
        type: Boolean,
        default: false
    }
})

user.methods.setPassword = function (pass) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(pass, this.salt, 10000, 512, 'sha512').toString('hex');
};

user.methods.validatePassword = function (pass) {
    const hash = crypto.pbkdf2Sync(pass, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
};

user.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 30);

    return jwt.sign({
        login: this.login,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}



module.exports = model('User', user)