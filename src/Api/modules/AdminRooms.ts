import axiosClient from "../axsiosClient";

export const getAllRooms = () => {
    return axiosClient.get("/api/v0/admin/rooms");
};

export const addRoom = (data: FormData) => {
    return axiosClient.post("/api/v0/admin/rooms", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const viewRoom = (id: number) => {
    return axiosClient.get(`/api/v0/admin/rooms/${id}`);
};

export const deleteRoom = (id: number) => {
    return axiosClient.delete(`/api/v0/admin/rooms/${id}`);
};

export const updateRoom = (id: number, data:FormData) => {
    return axiosClient.put(`/api/v0/admin/rooms/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};