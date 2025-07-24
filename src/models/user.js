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
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address");
            }
        }
    },
    gender: {
        type: String,
        trim: true,
        validate(value) {
            const allowedGenders = ['male', 'female', 'other'];
            if (!allowedGenders.includes(value.toLowerCase())) {
                throw new Error(`${value} is not a valid gender`);
            }
        }
    },
    age: {
        type: Number,
        min: 13,
    },
    contactInfo: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, 'any')) {
                throw new Error("Invalid contact number");
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
                throw new Error("Password too weak");
            }
        }
    },
    photoUrl: {
        type: String,
        trim: true,
        validate(value) {
            if (value && !validator.isURL(value)) {
                throw new Error("Invalid photo URL");
            }
        }
    },

    about: {
        type: String,
        trim: true,
        maxLength: 500,
        default: ""
    },

    skills: {
    type: [String],
    default: [],
    validate: {
        validator: function (value) {
            return Array.isArray(value) && value.length <= 10;
        },
        message: "You can add up to 10 skills only"
    }
}

}, {
    timestamps: true,
});

userSchema.index({ firstName: 1, lastName: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;