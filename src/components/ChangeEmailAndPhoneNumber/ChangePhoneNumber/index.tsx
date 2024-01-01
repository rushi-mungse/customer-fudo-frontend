export { default as SendOtpForChangeOldPhoneNumber } from "./Steps/SendOtpForChangeOldPhoneNumber/sendOtpForChangeOldPhoneNumber";
export { default as SendOtpForSetNewPhoneNumber } from "./Steps/SendOtpForSetNewPhoneNumber/sendOtpForSetNewPhoneNumber";
export { default as VerifyOtpForChangeOldPhoneNumber } from "./Steps/VerifyOtpForChangeOldPhoneNumber/verifyOtpForChangeOldPhoneNumber";
export { default as VerifyOtpForSetNewPhoneNumber } from "./Steps/VerifyOtpForSetNewPhoneNumber/verifyOtpForSetNewPhoneNumber";

export type TPropTypes = {
    step: number;
    setStep: (step: number) => void;
};
