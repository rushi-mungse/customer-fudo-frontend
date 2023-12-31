import { Button, Form, message } from "antd";
import { InputOTP } from "antd-input-otp";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { PropsTypes } from "../";
import { ErrorType, EmailVerifyOtpDataType } from "../../../../types";
import { verifyOtpForChangeOldEmail } from "../../../../services/api";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../state";
import { clearOtp } from "../../../../state";

const VerifySentOtpOldEmail = ({ step, setStep }: PropsTypes) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const otpInfo = useAppSelector((state: RootState) => state.otpReducer.otp);
    const dispatch = useAppDispatch();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["VerifySendOtpOldEmail"],

        mutationFn: async (data: EmailVerifyOtpDataType) =>
            verifyOtpForChangeOldEmail(data),

        onSuccess: async () => {
            setStep(step + 1);
            messageApi.open({
                type: "success",
                content: "Verify otp successfully.",
                duration: 3,
            });
            form.resetFields();
            dispatch(clearOtp());
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
            {contextHolder}
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
                        otp: joinOtp,
                        hashOtp: otpInfo.hashOtp,
                        email: otpInfo.email,
                        fullName: otpInfo.fullName,
                    });
                }}
                className="flex items-center justify-between py-2"
            >
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
                        disabled={step !== 1}
                        name="otp"
                    />
                </Form.Item>
                <Button
                    disabled={step !== 1}
                    className="mb-6"
                    loading={isLoading}
                    htmlType="submit"
                >
                    Verify Otp
                </Button>
            </Form>
        </div>
    );
};

export default VerifySentOtpOldEmail;
