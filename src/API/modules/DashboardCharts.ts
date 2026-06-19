import axiosClient from "../axsiosClient";

export interface DashboardDataResponse {
  success: boolean;
  message: string;
  data: {
    rooms: number;
    facilities: number;
    bookings: {
      pending: number;
      completed: number;
    };
    ads: number;
    users: {
      user: number;
      admin: number;
    };
  };
}

export const getDashboardCharts = () => {
return axiosClient.get<DashboardDataResponse>("/api/v0/admin/dashboard")};
