import axiosClient from "../axsiosClient";

export const getAllRooms = () => {
    return axiosClient.get("/rooms");
};

export const addRoom = (data: { name: string }) => {
    return axiosClient.post("/rooms", data);
};

export const viewRoom = (id: number) => {
    return axiosClient.get(`/rooms/${id}`);
};

export const deleteRoom = (id: number) => {
    return axiosClient.delete(`/rooms/${id}`);
};

export const updateRoom = (id: number, data: { name: string }) => {
    return axiosClient.put(`/rooms/${id}`, data);
};