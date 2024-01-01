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
    otp?: string;
    phoneNumber: string;
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
    role: string;
    avatar: string | null;
    phoneNumber: string | null;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IEmailData {
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

export interface IHttpError {
    type: string;
    msg: string;
    path: string;
    location: string;
}
export interface IErrorData {
    error: IHttpError[];
}

export interface ISendOtpByPhoneNumberData {
    phoneNumber: string;
    countryCode: string;
}

export interface IVerifyOtpByPhoneNumberData {
    phoneNumber: string;
    otp: string;
    hashOtp: string;
    fullName: string;
    countryCode: string;
}
