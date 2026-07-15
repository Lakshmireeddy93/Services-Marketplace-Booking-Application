const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  getServiceById,
} = require("../controllers/serviceController");

router.post("/", createService);

router.get("/", getServices);

router.get("/:id", getServiceById);

module.exports = router;