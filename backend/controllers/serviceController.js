const Service = require("../models/Service");

// Add a new service
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);

    await service.save();

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.json(services);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get one service
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    res.json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};