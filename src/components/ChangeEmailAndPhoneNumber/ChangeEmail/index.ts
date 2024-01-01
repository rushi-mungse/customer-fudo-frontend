export { default as SendOtpForChangeOldEmail } from "./Steps/SendOtpForChangeOldEmail/sendOtpForChangeOldEmail";
export { default as SendOtpForSetNewEmail } from "./Steps/SendOtpForSetNewEmail/sendOtpForSetNewEmail";
export { default as VerifyOtpForSetNewEmail } from "./Steps/VerifyOtpForSetNewEmail/verifyOtpForSetNewEmail";
export { default as VerifyOtpForChangeOldEmail } from "./Steps/VerifyOtpForChangeOldEmail/verifyOtpForChangeOldEmail";

export type TPropTypes = {
    step: number;
    setStep: (step: number) => void;
};
