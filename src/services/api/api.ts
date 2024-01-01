import {
    IEmailData,
    ILoginData,
    IResetPasswordData,
    ISendOtpData,
    IVerifyOtpData,
    IUpdateFullNameData,
    IChangePasswordData,
    ISendOtpByPhoneNumberData,
    IVerifyOtpByPhoneNumberData,
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

export const sendOtpForChangeOldEmail = (data: IEmailData) =>
    api.post("/user/send-otp-for-email-change", data);

export const verifyOtpForChangeOldEmail = (data: IVerifyOtpData) =>
    api.post("/user/verify-otp-for-email-change", data);

export const sendOtpForSetNewEmail = (data: IEmailData) =>
    api.post("/user/send-otp-to-new-email-for-email-change", data);

export const verifyOtpForSetNewEmail = (data: IVerifyOtpData) =>
    api.post("/user/verify-new-email-for-email-change", data);

export const sendOtpForChangeOldPhoneNumber = (
    data: ISendOtpByPhoneNumberData
) => api.post("/user/send-otp-for-change-old-phone-number", data);

export const verifyOtpForChangeOldPhoneNumber = (
    data: IVerifyOtpByPhoneNumberData
) => api.post("/user/verify-otp-for-change-old-phone-number", data);

export const sendOtpForSetNewPhoneNumber = (data: ISendOtpByPhoneNumberData) =>
    api.post("/user/send-otp-for-set-new-phone-number", data);

export const verifyOtpForSetPhoneNumber = (data: IVerifyOtpByPhoneNumberData) =>
    api.post("/user/verify-otp-for-set-new-phone-number", data);

export const self = () => api.get("/auth/self");
