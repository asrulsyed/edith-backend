var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    // password: {
    //     type: String,
    //     validate: [
    //         function (password) {
    //             return password && password.length >= 6;
    //         }, 'Password must provide over 6 characters.'
    //     ]
    // },
    inviteCode: {
        type: String,
        required: true
    },
    referralCode: {
        type: String,
    },
    loginType: {
        type: String,
        default: "manual"
    },
    twitterId: {
        type: String,
        default: ""
    },
    thumbnail: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
        // required: [true, "Insert name."]
    },
    api: {
        type: String,
        default: ""
    },
    verify: {
        type: Boolean,
        default: false
    },
    lastLogin: { // lastest login time
        type: Date,
        default: Date.now()
    },
    logins: { // login number
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: "user"
    },
    salt: {
        type: String
    },
}, {
    timestamps: true
});

// To hash password before save into database
UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.salt = new Buffer.alloc(16, crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

// Return hased password
UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000,
        64, 'sha512').toString('base64');
};

// Compared hased password from user with database's password so if exist, then res is true, not false
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

// Register maked Schema as User moder into Database
// Third parameter is collection name that User model register into database as user 
// If you don't give third parameter, register into Database as users 
mongoose.model('User', UserSchema, "user");