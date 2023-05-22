const express = require("express");
const router = express.Router();
const {getUsers, createUser, getUser, updateUser, deleteUser} = require("../controllers/userController");

router.route("/all").get(getUsers);
router.route("/register").post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/login").post((req, res) => {
    res.status(200).json({message: "Login API"});
});

module.exports = router;
