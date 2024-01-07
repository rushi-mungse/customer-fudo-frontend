import api from "./client";
import {
    ChangePasswordDataType,
    EmailVerifyOtpDataType,
    LoginDataType,
    PhoneNumberDataType,
    PhoneNumberVerifyOtpDataType,
    RegisterSendOtpDataType,
    ResetPasswordDataType,
} from "../../types";

export const sendOtpForVerifyEmail = (data: RegisterSendOtpDataType) =>
    api.post("/auth/register/send-otp", data);

export const verifyOtpForRegisterEmail = (data: EmailVerifyOtpDataType) =>
    api.post("/auth/register/verify-otp", data);

export const login = (data: LoginDataType) => api.post("/auth/login", data);

export const logout = () => api.get("/auth/logout");

export const self = () => api.get("/auth/self");

export const forgetPassword = (data: { email: string }) =>
    api.post("/auth/forget-password", data);

export const setPassword = (data: ResetPasswordDataType) =>
    api.post("/auth/set-password", data);

export const updateFullName = (data: { fullName: string }) =>
    api.post("/user/update-full-name", data);

export const changePassword = (data: ChangePasswordDataType) =>
    api.post("/user/change-password", data);

export const sendOtpForChangeOldEmail = (data: { email: string }) =>
    api.post("/user/send-otp-for-email-change", data);

export const verifyOtpForChangeOldEmail = (data: EmailVerifyOtpDataType) =>
    api.post("/user/verify-otp-for-email-change", data);

export const sendOtpForSetNewEmail = (data: { email: string }) =>
    api.post("/user/send-otp-to-new-email-for-email-change", data);

export const verifyOtpForSetNewEmail = (data: EmailVerifyOtpDataType) =>
    api.post("/user/verify-new-email-for-email-change", data);

export const sendOtpForChangeOldPhoneNumber = (data: PhoneNumberDataType) =>
    api.post("/user/send-otp-for-change-old-phone-number", data);

export const verifyOtpForChangeOldPhoneNumber = (
    data: PhoneNumberVerifyOtpDataType
) => api.post("/user/verify-otp-for-change-old-phone-number", data);

export const sendOtpForSetNewPhoneNumber = (data: PhoneNumberDataType) =>
    api.post("/user/send-otp-for-set-new-phone-number", data);

export const verifyOtpForSetPhoneNumber = (
    data: PhoneNumberVerifyOtpDataType
) => api.post("/user/verify-otp-for-set-new-phone-number", data);

export const getAllUser = () => api.get("/user");

export const deleteUser = (userId: number) => api.delete(`/user/${userId}`);

export const sendOtpForUserRegister = (data: RegisterSendOtpDataType) =>
    api.post("/user/register/send-otp", data);

export const verifyOtpForUserRegister = (data: EmailVerifyOtpDataType) =>
    api.post("/user/register/verify-otp", data);
