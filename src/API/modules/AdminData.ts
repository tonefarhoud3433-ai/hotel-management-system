import axiosClient from "../axsiosClient";

export const getAllFacilities = () => {
    return axiosClient.get("/room-facilities");
};

// تعديل: أضفنا باراميتر data عشان يستقبل { name: facilityName }
export const addFacilities = (data: { name: string }) => {
    return axiosClient.post("/room-facilities", data);
};

export const viewFacilities = (id: number) => {
    return axiosClient.get(`/room-facilities/${id}`);
};

export const deleteFacilities = (id: number) => {
    return axiosClient.delete(`/room-facilities/${id}`);
};

// تعديل: أضفنا باراميتر data عشان يستقبل الاسم الجديد وقت التعديل
export const updateFacilities = (id: number, data: { name: string }) => {
    return axiosClient.put(`/room-facilities/${id}`, data);
};