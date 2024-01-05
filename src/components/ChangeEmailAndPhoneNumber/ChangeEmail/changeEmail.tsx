import { useState } from "react";
import { Steps } from "antd";
import { RootState } from "../../../state";
import { useAppSelector } from "../../../hooks/reduxHooks";
import {
    SendOtpForChangeOldEmail,
    VerifyOtpForChangeOldEmail,
    SendOtpForSetNewEmail,
    VerifyOtpForSetNewEmail,
} from ".";

const ChangeEmail = () => {
    const [step, setStep] = useState(0);
    const { user } = useAppSelector((state: RootState) => state.authReducer);
    const otpInfo = useAppSelector((state: RootState) => state.otpReducer.otp);

    return (
        <Steps
            direction="vertical"
            size="small"
            current={step}
            items={[
                {
                    title: (
                        <span className="text-active">
                            Send verification code to registered email address
                        </span>
                    ),
                    description: (
                        <SendOtpForChangeOldEmail
                            step={step}
                            setStep={setStep}
                        />
                    ),
                },
                {
                    title: (
                        <div className="w-full">
                            <span className="text-active inline-block">
                                Enter verification code sent to registered email
                                address
                            </span>
                            <div className="font-light tracking-wide italic">
                                {user?.email}
                            </div>
                        </div>
                    ),
                    description: (
                        <VerifyOtpForChangeOldEmail
                            step={step}
                            setStep={setStep}
                        />
                    ),
                },
                {
                    title: (
                        <span className="text-active">
                            Enter your new email address
                        </span>
                    ),
                    description: (
                        <SendOtpForSetNewEmail step={step} setStep={setStep} />
                    ),
                },
                {
                    title: (
                        <>
                            <span className="text-active inline-block">
                                Enter verification code sent to new email
                                address{" "}
                            </span>
                            <div className="font-light tracking-wide italic">
                                {step > 2 && otpInfo?.email}
                            </div>
                        </>
                    ),
                    description: (
                        <VerifyOtpForSetNewEmail
                            step={step}
                            setStep={setStep}
                        />
                    ),
                },
            ]}
        />
    );
};

export default ChangeEmail;
