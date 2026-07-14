const Service = require("../models/Service");

const getServices = async (req, res)=>{
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};

const getServiceById = async (req, res)=>{
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createService = async (req, res)=>{
    try{
        const service = new Service(req.body);
        await service.save();
        res.status(201).json(service);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

const updateService = async (req, res)=>{
    try{
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, 
            {returnDocument: "after"});
        if(!service){
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteService = async (req, res)=>{
  try{
    const service = await Service.findByIdAndDelete(req.params.id);

    if(!service){
      return res.status(404).json({message: "Service not found"});
    }

    res.status(200).json({message: "Service deleted successfully"});
  }catch(error){
    res.status(500).json({message: error.message});
  }
};

module.exports={
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};