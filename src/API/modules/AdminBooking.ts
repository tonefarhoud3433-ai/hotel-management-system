import axiosClient from "../axsiosClient";

export const getAllBookings = () => {
    return axiosClient.get("/booking");
};


export const viewBookings = (id: number) => {
    return axiosClient.get(`/booking/${id}`);
};

export const deleteBookings = (id: number) => {
    return axiosClient.delete(`/booking/${id}`);
};

