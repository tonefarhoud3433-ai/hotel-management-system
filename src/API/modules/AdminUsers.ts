import axiosClient from "../axsiosClient";

export const getAllUsers = () => {
    return axiosClient.get("/users");
};


export const viewUsersProfile = (id: number) => {
    return axiosClient.get(`/users/${id}`);
};



