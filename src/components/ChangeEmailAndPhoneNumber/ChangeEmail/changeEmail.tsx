import { Steps } from "antd";
import { RootState } from "../../../state/store";
import { useAppSelector } from "../../../hooks/reduxHooks";
import {
    SendVerificationCodeNewEmail,
    SendVerificationCodeOldEmail,
    VerifySentOtpNewEmail,
    VerifySentOtpOldEmail,
} from "./";
import { useState } from "react";

const ChangeEmail = () => {
    const [step, setStep] = useState(0);

    const { user } = useAppSelector((state: RootState) => state.authReducer);
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
                        <SendVerificationCodeOldEmail
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
                            <span className="text-dark font-pure-600/50">
                                {user?.email}
                            </span>
                        </div>
                    ),
                    description: (
                        <VerifySentOtpOldEmail step={step} setStep={setStep} />
                    ),
                },
                {
                    title: (
                        <span className="text-active">
                            Enter your new email address
                        </span>
                    ),
                    description: (
                        <SendVerificationCodeNewEmail
                            step={step}
                            setStep={setStep}
                        />
                    ),
                },
                {
                    title: (
                        <div>
                            <span className="text-active inline-block">
                                Enter verification code sent to new email
                                address{" "}
                            </span>
                            <span className="text-dark font-pure-600/50">
                                {user?.email}
                            </span>
                        </div>
                    ),
                    description: (
                        <VerifySentOtpNewEmail step={step} setStep={setStep} />
                    ),
                },
            ]}
        />
    );
};

export default ChangeEmail;
