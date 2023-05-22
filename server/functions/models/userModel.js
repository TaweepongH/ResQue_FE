
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter first name"],
        },
        lastName: {
            type: String,
            required: [true, "Please enter last name"],
        },
        age: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("User", userSchema);
