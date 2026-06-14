import axiosClient from "../axsiosClient";

export const getAllRooms = () => {
    return axiosClient.get("/rooms");
};

export const addRoom = (data: FormData) => {
    return axiosClient.post("/rooms", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const viewRoom = (id: number) => {
    return axiosClient.get(`/rooms/${id}`);
};

export const deleteRoom = (id: number) => {
    return axiosClient.delete(`/rooms/${id}`);
};

export const updateRoom = (id: number, data: FormData) => {
    return axiosClient.put(`/rooms/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};