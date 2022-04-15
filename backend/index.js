require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const documentRouter = require("./routes/document");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@writerapp.5t6ju.mongodb.net/WriterApp?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("connect database success!");
    })
    .catch((error) => {
        console.error("connect database error!");
    });

app.use(logger("dev"));

// route
app.use("/api/document", documentRouter);

// catch 404 errors
app.use((req, res, next) => {
    const err = new Error("Not Found!");
    err.status = 404;
    next(err);
});

// error handler function
app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {};
    const status = err.status || 500;

    // response to client
    return res.status(status).json({
        error: {
            message: error.message,
        },
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});
