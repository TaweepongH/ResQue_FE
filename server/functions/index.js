/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions/v2/https");
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const {logger} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/v2/https");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
// const {getFirestore} = require("firebase-admin/firestore");

initializeApp();
if (process.env.NODE_ENV == "dev") {
    require("dotenv").config({path: `.env.${process.env.NODE_ENV}`});
} else {
    require("dotenv").config({path: `.env.prod`});
}

const express = require("express");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
// require("dotenv").config();


connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/partners", require("./routes/partnerRoutes"));
app.use(errorHandler);

/*  Dev Only !!!!  */

if (process.env.NODE_ENV == "dev") {
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
        console.log(`Demo project at : ${PORT}!`);
    });
}

exports.app = functions.onRequest(app);
