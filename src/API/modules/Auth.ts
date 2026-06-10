import axiosClient from "../axsiosClient";

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgetPasswordData {
  email: string;
} 
export interface ResetPasswordData {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
};

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  userName: string;
  userEmail: string;
  userPhone: string;
}

export const apiLogin = (data: LoginData) => {
  return axiosClient.post("/users/login", data);
};

export const apiRegister = (data: FormData) => {
  return axiosClient.post("/users", data);
};

export const apiForgetPassword = (data: ForgetPasswordData) => {
  return axiosClient.post("/api/v0/portal/users/forgot-password", data);
};

export const apiReset = (data: ResetPasswordData) => {
  return axiosClient.post("/users/reset-password", data);
};

export const apichangePassword = (data: ChangePasswordData) => {
  return axiosClient.post("/users/change-password", data);
};
