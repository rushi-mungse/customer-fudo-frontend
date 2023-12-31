import {
    IEmailData,
    ILoginData,
    IResetPasswordData,
    ISendOtpData,
    IVerifyOtpData,
    IUpdateFullNameData,
    IChangePasswordData,
} from "../../types";
import api from "./client";

export const sendOtp = (data: ISendOtpData) =>
    api.post("/auth/register/send-otp", data);

export const verifyOtp = (data: IVerifyOtpData) =>
    api.post("/auth/register/verify-otp", data);

export const login = (data: ILoginData) => api.post("/auth/login", data);

export const getTenants = () => api.get("/tenant");

export const logout = () => api.get("/auth/logout");

export const forgetPassword = (data: IEmailData) =>
    api.post("/auth/forget-password", data);

export const setPassword = (data: IResetPasswordData) =>
    api.post("/auth/set-password", data);

export const updateFullName = (data: IUpdateFullNameData) =>
    api.post("/user/update-full-name", data);

export const changePassword = (data: IChangePasswordData) =>
    api.post("/user/change-password", data);

export const sendVerificationCodeOldEmail = (data: IEmailData) =>
    api.post("/user/send-otp-for-email-change", data);

export const verifySentOtpOldEmail = (data: IVerifyOtpData) =>
    api.post("/user/verify-otp-for-email-change", data);

export const sendVerificationCodeNewEmail = (data: IEmailData) =>
    api.post("/user/send-otp-to-new-email-for-email-change", data);

export const verifySentOtpNewEmail = (data: IVerifyOtpData) =>
    api.post("/user/verify-new-email-for-email-change", data);

export const self = () => api.get("/auth/self");
