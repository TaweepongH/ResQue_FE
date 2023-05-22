const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
// @desc Get All Users
// @route GET /users
// @access public
const getUsers = asyncHandler( async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

// @desc Get Users by ID
// @route GET /users/:id
// @access public
const getUser = asyncHandler( async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

// @desc Create New Users
// @route POST /users
// @access public
const createUser = asyncHandler( async (req, res) => {
    try {
        const {firstName, lastName} = req.body;
        if (!firstName, !lastName) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const userData = await User.create(req.body);
        res.status(201).json(userData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

// @desc Update Users
// @route PATCH /users
// @access public
const updateUser = asyncHandler( async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({message: `Cannot find a any customer with ID: ${id}`});
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

// @desc Delete Users
// @route DELETE /users
// @access public
const deleteUser = asyncHandler( async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({message: `Cannot find a any customer with ID: ${id}`});
        }
        // const updatedUser = await User.findById(id);
        res.status(200).json({message: `User ID ${id} has been deleted`});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

module.exports = {getUsers, createUser, getUser, updateUser, deleteUser};
