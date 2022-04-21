const Document = require("../models/Document");
const bcrypt = require("bcryptjs");

class DocumentController {
    async index(req, res, next) {
        const documents = await Document.find({});
        return res.json({ success: true, documents });
    }
    async createDocument(req, res, next) {
        const newDocument = new Document(req.body);
        await newDocument.save();
        return res.json({ success: true, document: newDocument });
    }
    async getDocument(req, res, next) {
        const { documentID } = req.value.params;
        const document = await Document.findById(documentID);

        return res.json({ success: true, document });
    }
    async updateDocument(req, res, next) {
        const { documentID } = req.value.params;

        const newDocument = req.body;

        const result = await Document.findByIdAndUpdate(
            documentID,
            newDocument
        );

        return res.json({ success: true, document: newDocument });
    }
    async deleteDocument(req, res, next) {
        const { documentID } = req.value.params;
        const deletedDocument = await Document.findOneAndDelete(documentID);

        return res.json({
            success: true,
            document: deletedDocument,
        });
    }
    async openDocument(req, res, next) {
        return res.json({
            success: true,
        });
    }
}

module.exports = new DocumentController();
