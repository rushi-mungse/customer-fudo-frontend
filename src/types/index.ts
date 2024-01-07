export interface RegisterSendOtpDataType {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: string;
}

export interface EmailVerifyOtpDataType {
    fullName: string;
    email: string;
    hashOtp: string;
    otp: string;
    role?: string;
}

export interface OtpDataType {
    fullName: string;
    email: string;
    hashOtp: string;
    phoneNumber: string;
    otp?: string;
    role: string;
}

export interface UserDataType {
    id: number;
    fullName: string;
    email: string;
    role: string;
    avatar: string | null;
    phoneNumber: string | null;
}

export interface LoginDataType {
    email: string;
    password: string;
}

export interface ResetPasswordDataType {
    email: string;
    hashOtp: string;
    otp: string;
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordDataType {
    oldPassword: string;
    newPassword: string;
}

export interface HttpErrorType {
    type: string;
    msg: string;
    path: string;
    location: string;
}
export interface ErrorType {
    error: HttpErrorType[];
}

export interface PhoneNumberDataType {
    phoneNumber: string;
    countryCode: string;
}

export interface PhoneNumberVerifyOtpDataType {
    phoneNumber: string;
    otp: string;
    hashOtp: string;
    fullName: string;
    countryCode: string;
}

export interface ProductDataType {
    name: string;
    description: string;
    price: number;
    size: string;
    currency: string;
    availability: boolean;
    preparationTimeInMinute: number;
    discount: number;
    category: string;
    ingredients: string;
}
