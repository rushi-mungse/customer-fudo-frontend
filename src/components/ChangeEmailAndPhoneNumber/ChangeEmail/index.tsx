export { default as SendOtpForChangeOldEmail } from "./Steps/SendOtpToOldEmail";
export { default as SendOtpForSetNewEmail } from "./Steps/sendOtpForSetNewEmail";
export { default as VerifyOtpForSetNewEmail } from "./Steps/verifyOtpForSetNewEmail";
export { default as VerifyOtpForChangeOldEmail } from "./Steps/verifyOtpForChangeOldEmail";

export type PropsTypes = {
    step: number;
    setStep: (step: number) => void;
};
