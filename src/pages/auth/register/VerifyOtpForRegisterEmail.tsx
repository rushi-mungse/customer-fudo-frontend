import React, { useState, useEffect } from "react";
import { Spin, message } from "antd";
import { useMutation } from "react-query";
import { GoUnverified, GoVerified } from "react-icons/go";
import { OtpBox } from "../../../components";
import { ButtonUi } from "../../../ui";
import { verifyOtpForRegisterEmail } from "../../../services/api";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../state";
import { EmailVerifyOtpDataType, ErrorType } from "../../../types";
import { setAuth } from "../../../state/slices/auth";
import { AxiosError } from "axios";

const OtpVerification = () => {
    const [otpDigits, setOTPDigits] = useState(["", "", "", ""]);
    const otpInputRef = Array(4)
        .fill(0)
        .map(() => React.createRef<HTMLInputElement>());
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        otpInputRef[0].current?.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const otpInfo = useAppSelector((state: RootState) => state.otpReducer.otp);
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );

    const { mutate, isLoading } = useMutation({
        mutationKey: ["verifyOtp"],
        mutationFn: async (data: EmailVerifyOtpDataType) =>
            verifyOtpForRegisterEmail(data),
        onSuccess: async ({ data }) => {
            dispatch(setAuth(data));
            messageApi.open({
                type: "success",
                content: `Welcome ${data.fullName}, Your are registered successfully.`,
                duration: 3,
            });
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
        });
    };

    return (
        <div className="container mx-auto">
            {contextHolder}
            <div className="flex items-center justify-center w-full h-screen">
                <div className="flex items-center justify-center w-full bg-pure rounded-lg">
                    <div className="w-1/2 bg-secondary items-center justify-center rounded-md">
                        <div className="h-full w-full items-center justify-center">
                            <img src="/delivery.svg" alt="delivery" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-col w-1/2 ring-1 ring-dark/20 py-10 rounded-md shadow-md shadow-dark/40">
                        {!isLoading ? (
                            <div className="w-[350px] flex-center flex-col">
                                <div className="text-6xl text-active">
                                    {isAuth ? <GoVerified /> : <GoUnverified />}
                                </div>
                                <h1 className="text-dark/80 mt-2 text-lg font-bold tracking-wider">
                                    OTP VERIFICATION
                                </h1>
                                <p className="text-dark/70 mt-4 text-sm text-center">
                                    4 Digit code has been sent to your email
                                    address
                                </p>
                                <span className="text-dark block mb-8 italic text-sm">
                                    {otpInfo?.email}
                                </span>
                                <OtpBox
                                    handleOnChange={handleOnChange}
                                    otpDigits={otpDigits}
                                    otpInputRef={otpInputRef}
                                />
                                <ButtonUi
                                    intent={"tertiary"}
                                    size={"sm"}
                                    rounded={"medium"}
                                    className="mt-8"
                                    leadingIcon={GoUnverified}
                                    onClick={handleOnClick}
                                >
                                    Verify OTP
                                </ButtonUi>
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
            </div>
        </div>
    );
};

export default OtpVerification;
