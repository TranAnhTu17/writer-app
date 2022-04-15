const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const DocumentSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    password: {
        type: String,
    },
});

DocumentSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);

        const passwordHashed = await bcrypt.hash(this.password, salt);

        this.password = passwordHashed;

        next();
    } catch (error) {
        next(error);
    }
});

const Document = mongoose.model("Document", DocumentSchema);
module.exports = Document;
