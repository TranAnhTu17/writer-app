const Document = require("../models/Document");
const bcrypt = require("bcryptjs");

const middlewareController = {
    confirmPassword: async (req, res, next) => {
        const { password } = req.body;
        const { documentID } = req.value.params;
        const document = await Document.findById(documentID);

        const passwordValid = await bcrypt.compare(password, document.password);
        if (!passwordValid) {
            return res.json({
                success: false,
                message: "Incorrect password!",
            });
        } else {
            next();
        }
    },
};

module.exports = middlewareController;
