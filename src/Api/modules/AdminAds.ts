import axiosClient from "../axsiosClient";

export const getAllAds = () => {
    return axiosClient.get("/api/v0/admin/ads");
};

export const addAds = (data: { room: string; discount: number; isActive: boolean }) => {
    return axiosClient.post("/api/v0/admin/ads", data);
};

export const viewAds = (id: number) => {
    return axiosClient.get(`/api/v0/admin/ads/${id}`);
};

export const deleteAds = (id: number) => {
    return axiosClient.delete(`/api/v0/admin/ads/${id}`);
};
  
export const updateAds = (id: string, data: {  discount: number; isActive: boolean }) => {
    return axiosClient.put(`/api/v0/admin/ads/${id}`, data);
};