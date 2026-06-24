import axiosClient from "../axsiosClient";

export const getAllBookings = () => {
    return axiosClient.get("/api/v0/admin/booking");
};


export const viewBookings = (id: number) => {
    return axiosClient.get(`/api/v0/admin/booking/${id}`);
};

export const deleteBookings = (id: number) => {
    return axiosClient.delete(`/api/v0/admin/booking/${id}`);
};

