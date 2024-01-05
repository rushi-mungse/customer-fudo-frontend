export { default as SendOtpForChangeOldPhoneNumber } from "./Steps/SendOtpForChangeOldPhoneNumber";
export { default as SendOtpForSetNewPhoneNumber } from "./Steps/SendOtpForSetNewPhoneNumber";
export { default as VerifyOtpForChangeOldPhoneNumber } from "./Steps/VerifyOtpForChangeOldPhoneNumber";
export { default as VerifyOtpForSetNewPhoneNumber } from "./Steps/VerifyOtpForSetNewPhoneNumber";

export type TPropTypes = {
    step: number;
    setStep: (step: number) => void;
};
