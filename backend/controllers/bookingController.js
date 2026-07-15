const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
    try {
        const booking = new Booking({...req.body,
            user: req.user._id});
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("user", "name email")
            .populate("service", "name price");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("user", "name email")
            .populate("service", "name price");
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateBooking = async(req, res)=>{
    try{
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, 
            { returnDocument: "after" });
        if(!booking){
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteBooking = async(req, res)=>{
    try{
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if(!booking){
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};