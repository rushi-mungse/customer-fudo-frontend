export { default as SendVerificationCodeOldEmail } from "./Steps/SendVerificationCodeOldEmail/sendVerificationCodeOldEmail";
export { default as SendVerificationCodeNewEmail } from "./Steps/SendVerificationCodeNewEmail/sendVerificationCodeNewEmail";
export { default as VerifySentOtpNewEmail } from "./Steps/VerifySentOtpNewEmail/verifySentOtpNewEmail";
export { default as VerifySentOtpOldEmail } from "./Steps/VerifySentOtpOldEmail/verifySentOtpOldEmail";

export type TPropTypes = {
    step: number;
    setStep: (step: number) => void;
};
