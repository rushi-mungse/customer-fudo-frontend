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
    avatar: string | null;
    phoneNumber: string | null;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IForgotPasswordData {
    email: string;
}

export interface IResetPasswordData {
    email: string;
    hashOtp: string;
    otp: string;
    password: string;
    confirmPassword: string;
}

export interface IUpdateFullNameData {
    fullName: string;
}

export interface IChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export interface IError extends Error {
    message: string;
    data: {
        error: [];
    };
}
