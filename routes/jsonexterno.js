const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/api/jsonexterno", async function (req, res) {
  // #swagger.summary = 'obtiene un json desde otro sitio, a traves del servidor'
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
  res.json(response.data);
});

module.exports = router;
