import api from "./api";
export const getServices=()=>{
    return api.get("/services");
};
    //get services by id
   export const getServiceById=(id)=>{
    return api.get(`/services/${id}`);
};

    //create a booking

export const createBooking=(bookingData, token)=>{
    return api.post(
        "/bookings", bookingData,
        {
            headers: {
                Authorization:`Bearer ${token}`,
            },
        }
    );
};
export const getBookings =()=>{
    return api.get("/bookings");
};