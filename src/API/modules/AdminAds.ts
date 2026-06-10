import axiosClient from "../axsiosClient";

export const getAllAds = () => {
    return axiosClient.get("/ads");
};

export const addAds = (data: { name: string }) => {
    return axiosClient.post("/ads", data);
};

export const viewAds = (id: number) => {
    return axiosClient.get(`/ads/${id}`);
};

export const deleteAds = (id: number) => {
    return axiosClient.delete(`/ads/${id}`);
};

export const updateAds = (id: number, data: { name: string }) => {
    return axiosClient.put(`/ads/${id}`, data);
};