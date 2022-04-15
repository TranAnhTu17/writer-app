const express = require("express");
const router = express.Router();

const documentController = require("../controllers/DocumentController.js");

router
    .route("/")
    .get(documentController.index)
    .post(documentController.createDocument);

router
    .route("/:documentID")
    .get(documentController.getDocument)
    .post(documentController.confirmPassword)
    .patch(documentController.updateDocument)
    .delete(documentController.deleteDocument);

module.exports = router;
