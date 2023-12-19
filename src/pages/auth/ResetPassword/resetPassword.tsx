import React, { useEffect, useState } from "react";
import { OtpBox } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { RootState } from "../../../state/store";
import { useMutation } from "react-query";
import { setAuth } from "../../../state/slices/auth";
import { Form, Input } from "antd";
import { Button } from "../../../ui";
import { MailOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { setPassword } from "../../../services/api/api";
import { IResetPasswordData } from "../../../types";

interface FieldType {
    password?: string;
    confirmPassword?: string;
}

interface IFieldValues {
    password: string;
    confirmPassword: string;
}

const ResetPassword = () => {
    const [otpDigits, setOTPDigits] = useState(["", "", "", ""]);
    const otpInputRef = Array(4)
        .fill(0)
        .map(() => React.createRef<HTMLInputElement>());

    useEffect(() => {
        otpInputRef[0].current?.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const otpInfo = useAppSelector(
        (state: RootState) => state.otpInfoReducer.otpInfo
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationKey: ["resetPassword"],
        mutationFn: async (data: IResetPasswordData) => setPassword(data),
        onSuccess: async ({ data }) => {
            dispatch(setAuth(data.user));
            navigate("/");
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

    return (
        <div className="min-h-screen container mx-auto flex items-center justify-center">
            <div className="bg-pure p-8 rounded-md flex items-center justify-center flex-col border border-pure-600/80 shadow-lg shadow-pure-600">
                <h1 className="text-active font-bold text-3xl tracking-wide">
                    We send you a code
                </h1>
                <p className="text-darkGray my-1 text-md italic">
                    Please, enter it below to verify your email
                </p>
                <span className="text-primary block mb-4">
                    {otpInfo?.email}
                </span>

                <OtpBox
                    otpDigits={otpDigits}
                    otpInputRef={otpInputRef}
                    handleOnChange={handleOnChange}
                    className="my-4"
                />

                <Form
                    className="flex items-center flex-col"
                    onFinish={(values: IFieldValues) => {
                        if (!otpInfo) {
                            console.log("OtpInfo is null");
                            return;
                        }
                        const otp = otpDigits.join("");
                        mutate({
                            password: values.password,
                            confirmPassword: values.confirmPassword,
                            email: otpInfo.email,
                            otp,
                            hashOtp: otpInfo.hashOtp,
                        });
                    }}
                    autoComplete="off"
                    style={{ width: "350px" }}
                >
                    <Form.Item<FieldType>
                        rules={[
                            {
                                required: true,
                                message: "Please enter password",
                            },
                        ]}
                        style={{ width: "100%" }}
                        name="password"
                    >
                        <Input.Password
                            placeholder="Enter password"
                            prefix={
                                <MailOutlined className="text-pure-800 pr-2" />
                            }
                            className="font-light text-pure-800"
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        rules={[
                            {
                                required: true,
                                message: "Please enter password",
                            },
                        ]}
                        style={{ width: "100%" }}
                        name="confirmPassword"
                    >
                        <Input.Password
                            placeholder="Enter confirm password"
                            prefix={
                                <CheckSquareOutlined className="text-pure-800 pr-2" />
                            }
                            className="font-light text-pure-800"
                        />
                    </Form.Item>
                    <Button
                        type="submit"
                        intent={"tertiary"}
                        size={"sm"}
                        rounded={"medium"}
                    >
                        Reset Password
                    </Button>
                </Form>

                <div className="flex items-center justify-between mt-8 w-full">
                    <p className="text-pure-600 text-sm">
                        Don't recieved code yet?
                    </p>
                    <Link
                        className="text-blue text-sm italic hover:text-blue-700"
                        to="/send-otp-again"
                    >
                        Send Again
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
