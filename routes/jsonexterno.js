const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/api/jsonexterno", async function (req, res) {
  // #swagger.tags = ['Json externo']
  // #swagger.summary = 'Obtiene un json desde otro sitio, a traves del servidor'

  const response = await axios.get("https://restcountries.com/v3.1/all")
  res.json(response.data);
});

module.exports = router;
