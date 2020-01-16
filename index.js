const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const bodyParser = require("body-parser");

const globalRouter = require("./routes/globalRouter");

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.set("view engine", "pug");
app.use("/static", express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", globalRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
