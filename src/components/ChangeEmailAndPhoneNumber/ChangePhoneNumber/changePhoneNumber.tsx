import { useState } from "react";
import { Steps } from "antd";

import { useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../state/store";
import {
    SendOtpForChangeOldPhoneNumber,
    VerifyOtpForChangeOldPhoneNumber,
    SendOtpForSetNewPhoneNumber,
    VerifyOtpForSetNewPhoneNumber,
} from "./";

const ChangePhoneNumber = () => {
    const { user } = useAppSelector((state: RootState) => state.authReducer);
    const { otpInfo } = useAppSelector(
        (state: RootState) => state.otpInfoReducer
    );
    const [step, setStep] = useState(user?.phoneNumber ? 0 : 2);

    return (
        <Steps
            direction="vertical"
            size="small"
            current={0}
            items={[
                {
                    title: (
                        <span className="text-active">
                            Send verification code to old phone number
                        </span>
                    ),
                    description: (
                        <SendOtpForChangeOldPhoneNumber
                            step={step}
                            setStep={setStep}
                        />
                    ),
                },
                {
                    title: (
                        <>
                            <span className="text-active inline-block">
                                Enter verification code sent to old phone number
                            </span>
                            <div className="font-light tracking-wide italic">
                                {user?.phoneNumber}
                            </div>
                        </>
                    ),
                    description: (
                        <VerifyOtpForChangeOldPhoneNumber
                            step={step}
                            setStep={setStep}
                        />
                    ),
                },
                {
                    title: (
                        <span className="text-active">
                            Enter your new phone number
                        </span>
                    ),
                    description: (
                        <SendOtpForSetNewPhoneNumber
                            step={step}
                            setStep={setStep}
                        />
                    ),
                },
                {
                    title: (
                        <>
                            <span className="text-active inline-block">
                                Enter verification code sent to new phone number
                            </span>
                            <div className="font-light tracking-wide italic">
                                {step > 2 && otpInfo?.phoneNumber}
                            </div>
                        </>
                    ),
                    description: (
                        <VerifyOtpForSetNewPhoneNumber
                            setStep={setStep}
                            step={step}
                        />
                    ),
                },
            ]}
        />
    );
};

export default ChangePhoneNumber;
