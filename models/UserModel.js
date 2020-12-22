const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max: 32
    },      

    team: {
        type: [String],
        
    },

    event: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },

    mobile: {
        type: Number,
        required: true
    },

    registered: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
})

module.exports = User = mongoose.model('user', UserSchema)