const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    photo:{
        type:String,
        default:  "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
    },
    chats:
        [
            {
                message:{
                    type:String
                },
                userId:{
                    type:String
                },
                reciverId:{
                    type:String
                },
                timestamp:{
                    type: Date,
                    default: Date.now
                }

            }
        ],
    },
    {
        timestamps: true
    }
)

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel