import React, { useState, useEffect } from "react";
import { Button, Spin, message } from "antd";
import { useMutation } from "react-query";
import { GoUnverified, GoVerified } from "react-icons/go";
import { OtpBox } from "../../components";
import { verifyOtpForUserRegister } from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../state";
import { EmailVerifyOtpDataType, ErrorType } from "../../types";
import { setAuth } from "../../state/slices/auth";
import { AxiosError } from "axios";

const VerifyOtpStep = ({
    disabled,
    setDisabled,
}: {
    disabled: boolean;
    setDisabled: (set: boolean) => void;
}) => {
    const otpInfo = useAppSelector((state: RootState) => state.otpReducer.otp);
    const [otpDigits, setOTPDigits] = useState(["", "", "", ""]);
    const otpInputRef = Array(4)
        .fill(0)
        .map(() => React.createRef<HTMLInputElement>());
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        otpInputRef[0].current?.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );

    const { mutate, isLoading } = useMutation({
        mutationKey: ["verifyOtp"],
        mutationFn: async (data: EmailVerifyOtpDataType) =>
            verifyOtpForUserRegister(data),
        onSuccess: async ({ data }) => {
            dispatch(setAuth(data));
            messageApi.open({
                type: "success",
                content: `Welcome ${data.fullName}, Your are registered successfully.`,
                duration: 3,
            });
            setDisabled(true);
        },
        onError: async (err: AxiosError) => {
            const errors = err.response?.data as unknown as ErrorType;
            messageApi.open({
                type: "error",
                content: errors.error[0].msg,
                duration: 3,
            });
        },
    });

    const handleOnChange = (e: React.KeyboardEvent, index: number) => {
        const keyCode = e.keyCode;
        if (keyCode === 8) {
            otpDigits[index] = "";
            index > 0
                ? otpInputRef[index - 1].current?.focus()
                : otpInputRef[index].current?.focus();
        } else if (keyCode >= 48 && keyCode <= 57) {
            const digit = String.fromCharCode(keyCode);
            otpDigits[index] = digit;
            if (index < 3) otpInputRef[index + 1].current?.focus();
        }
        setOTPDigits([...otpDigits]);
    };

    const handleOnClick = async () => {
        const otp = otpDigits.join("");
        if (!otpInfo) {
            console.error("OtpInfo is null!");
            return;
        }
        mutate({
            fullName: otpInfo?.fullName,
            email: otpInfo?.email,
            hashOtp: otpInfo?.hashOtp,
            otp,
            role: otpInfo.role,
        });
    };

    return (
        <div>
            {contextHolder}
            <div className="w-[400px] h-[450px] flex items-center justify-center flex-col ring-1 ring-pure-600/10 p-8 rounded-md bg-pure">
                {!isLoading ? (
                    <div className="w-[350px] flex-center flex-col">
                        <div className="text-6xl text-active">
                            {isAuth ? <GoVerified /> : <GoUnverified />}
                        </div>
                        <h1 className="text-dark/80 mt-2 text-lg font-bold tracking-wider">
                            OTP VERIFICATION
                        </h1>
                        <p className="text-dark/70 mt-4 text-sm text-center">
                            4 Digit code has been sent to your email address
                        </p>
                        <span className="text-dark block mb-8 italic text-sm">
                            {otpInfo?.email}
                        </span>
                        <OtpBox
                            handleOnChange={handleOnChange}
                            otpDigits={otpDigits}
                            otpInputRef={otpInputRef}
                        />
                        <Button
                            disabled={disabled}
                            onClick={handleOnClick}
                            className="mt-28"
                        >
                            Verify Otp
                        </Button>
                    </div>
                ) : (
                    <div className="flex-center h-[500px]">
                        <Spin tip="" size="large">
                            <div className="content" />
                        </Spin>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyOtpStep;
