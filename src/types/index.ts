export interface ISendOtpData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IVerifyOtpData {
    fullName: string;
    email: string;
    hashOtp: string;
    otp: string;
}

export interface IOtpData {
    fullName: string;
    email: string;
    hashOtp: string;
}

export interface ITenantData {
    name: string;
    address: string;
    id: number;
}

export interface IUserData {
    fullName: string;
    email: string;
    id: number;
    tenant: ITenantData | null;
    role: string;
}
