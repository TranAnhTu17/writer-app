const express = require("express");
const router = express.Router();

const documentController = require("../controllers/DocumentController.js");
const { validateParam, schemas } = require("../helpers/routeHelpers");
const middlewareController = require("../middlewares/middlewareController");

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
        middlewareController.confirmPassword,
        documentController.openDocument
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
