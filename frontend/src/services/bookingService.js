import api from "./api";
export const getServices=()=>{
    return api.get("/services");
};
   export const getServiceById=(id)=>{
    return api.get(`/services/${id}`);
};

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