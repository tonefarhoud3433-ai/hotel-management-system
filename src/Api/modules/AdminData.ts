import axiosClient from "../axsiosClient";

export const getAllFacilities = () => {
    return axiosClient.get("/api/v0/admin/room-facilities");
};

// تعديل: أضفنا باراميتر data عشان يستقبل { name: facilityName }
export const addFacilities = (data: { name: string }) => {
    return axiosClient.post("/api/v0/admin/room-facilities", data);
};

export const viewFacilities = (id: number) => {
    return axiosClient.get(`/api/v0/admin/room-facilities/${id}`);
};

export const deleteFacilities = (id:string) => {
    return axiosClient.delete(`/api/v0/admin/room-facilities/${id}`);
};

// تعديل: أضفنا باراميتر data عشان يستقبل الاسم الجديد وقت التعديل
export const updateFacilities = (id: number, data: { name: string }) => {
    return axiosClient.put(`/api/v0/admin/room-facilities/${id}`, data);
};