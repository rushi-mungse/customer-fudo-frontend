import {
    IForgotPasswordData,
    ILoginData,
    IResetPasswordData,
    ISendOtpData,
    IVerifyOtpData,
    IUpdateFullNameData,
} from "../../types";
import api from "./client";

export const sendOtp = (data: ISendOtpData) =>
    api.post("/auth/register/send-otp", data);

export const verifyOtp = (data: IVerifyOtpData) =>
    api.post("/auth/register/verify-otp", data);

export const login = (data: ILoginData) => api.post("/auth/login", data);

export const getTenants = () => api.get("/tenant");

export const logout = () => api.get("/auth/logout");

export const forgetPassword = (data: IForgotPasswordData) =>
    api.post("/auth/forget-password", data);

export const setPassword = (data: IResetPasswordData) =>
    api.post("/auth/set-password", data);

export const updateFullName = (data: IUpdateFullNameData) =>
    api.post("/user/update-full-name", data);

export const self = () => api.get("/auth/self");
