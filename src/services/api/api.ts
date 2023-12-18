import { ISendOtpData, IVerifyOtpData } from "../../types";
import api from "./client";

export const sendOtp = (data: ISendOtpData) =>
    api.post("/auth/register/send-otp", data);

export const verifyOtp = (data: IVerifyOtpData) =>
    api.post("/auth/register/verify-otp", data);

export const getTenants = () => api.get("/tenant");
