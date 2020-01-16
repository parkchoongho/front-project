const express = require("express");
const axios = require("axios");
const FormData = require("form-data");

const BASE_API_URL = "http://localhost:4000";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/join", (req, res) => {
  res.render("join");
});

module.exports = router;
