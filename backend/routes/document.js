const express = require("express");
const router = express.Router();

const documentController = require("../controllers/DocumentController.js");
const { validateParam, schemas } = require("../helpers/routeHelpers");

router
    .route("/")
    .get(documentController.index)
    .post(documentController.createDocument);

router
    .route("/:documentID")
    .get(
        validateParam(schemas.idSchema, "documentID"),
        documentController.getDocument
    )
    .post(
        validateParam(schemas.idSchema, "documentID"),
        documentController.confirmPassword
    )
    .patch(
        validateParam(schemas.idSchema, "documentID"),
        documentController.updateDocument
    )
    .delete(
        validateParam(schemas.idSchema, "documentID"),
        documentController.deleteDocument
    );

module.exports = router;
