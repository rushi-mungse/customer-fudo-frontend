import { Button, Form, message } from "antd";
import { InputOTP } from "antd-input-otp";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { PropsTypes } from "../";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../state";
import { ErrorType, EmailVerifyOtpDataType } from "../../../../types";
import { verifyOtpForSetNewEmail } from "../../../../services/api";
import { setAuth } from "../../../../state/slices/auth";
import { clearOtp } from "../../../../state";

const VerifySentOtpNewEmail = ({ step, setStep }: PropsTypes) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const otpInfo = useAppSelector((state: RootState) => state.otpReducer.otp);
    const dispatch = useAppDispatch();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["VerifyOtpForSetNewEmail"],

        mutationFn: async (data: EmailVerifyOtpDataType) =>
            verifyOtpForSetNewEmail(data),

        onSuccess: async ({ data }) => {
            dispatch(setAuth(data.user));
            setStep(0);
            messageApi.open({
                type: "success",
                content: "Verify otp successfully.",
                duration: 3,
            });
            dispatch(clearOtp());
            form.resetFields();
        },

        onError: async (err: AxiosError) => {
            const errors = err.response?.data as unknown as ErrorType;
            messageApi.open({
                type: "error",
                content: <span>{errors.error[0].msg}</span>,
                duration: 3,
            });
        },
    });

    return (
        <div className="py-2">
            <Form
                form={form}
                onFinish={(values: { otp: string[] }) => {
                    if (!otpInfo) {
                        messageApi.open({
                            type: "error",
                            content: "Something went wrong (otpInfo not found)",
                            duration: 3,
                        });
                        return;
                    }
                    const joinOtp = values.otp.join("");
                    mutate({
                        email: otpInfo?.email,
                        fullName: otpInfo?.fullName,
                        hashOtp: otpInfo?.hashOtp,
                        otp: joinOtp,
                    });
                }}
                className="flex items-center justify-between py-2"
            >
                {contextHolder}
                <Form.Item name="otp">
                    <InputOTP
                        inputType="numeric"
                        length={4}
                        inputStyle={{
                            height: 40,
                            width: 40,
                            fontSize: 16,
                            padding: 4,
                        }}
                        disabled={step !== 3}
                    />
                </Form.Item>
                <Button
                    disabled={step !== 3}
                    className="mb-4"
                    htmlType="submit"
                    loading={isLoading}
                >
                    Verify Otp
                </Button>
            </Form>
        </div>
    );
};

export default VerifySentOtpNewEmail;
