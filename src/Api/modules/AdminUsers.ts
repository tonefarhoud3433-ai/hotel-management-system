import axiosClient from "../axsiosClient";

export const getAllUsers = () => {
    return axiosClient.get("/api/v0/admin/users");
};


export const viewUsersProfile = (id: number) => {
    return axiosClient.get(`/api/v0/admin/users/${id}`);
};



