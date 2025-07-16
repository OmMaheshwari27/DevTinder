const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        minLength: [2, 'too small name'],
        maxLength: 20,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        default: " ",
    },
    email: {
        type: String,
        lowercase: true,
        required:true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("Invalid Email Address");
            }
        }
    },
    gender: {
        type: String,
        //required: true,
        trim: true,
        validate(value) {
            const allowedGenders = ['male', 'female', 'other'];
            if (!allowedGenders.includes(value.toLowerCase())) {
                throw new Error(`${value} is not a valid gender`);
            }
        }
    //     enum: {
    //     values:["interested", "ignored", "accepted", "pending"],
    //     message:`{VALUE} is incorret status type`
    // },
    },
    age: {
        type: Number,
        //required:true,
        min: 13,
    },
    contactInfo: {
        type: String,
       // required: true,
        trim: true,
        validate(value) {
            const validator = require("validator");
            if (!validator.isMobilePhone(value, 'any')) {
                throw new Error("Invalid contact number\n");
            }
        }
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 20,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new error("Password too weak\n");
            }
        }
    }
}, {
    timestamps: true,
}
);

userSchema.index({firstName:1,lastName:1});
// basically User named class is defined in DB
const User = mongoose.model("User", userSchema)

module.exports = User;