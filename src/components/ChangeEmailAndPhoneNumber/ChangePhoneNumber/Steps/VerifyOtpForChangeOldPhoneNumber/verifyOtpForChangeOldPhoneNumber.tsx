import { Button, Form, message } from "antd";
import { InputOTP } from "antd-input-otp";
import { TPropTypes } from "../../";
import { useMutation } from "react-query";
import { IErrorData, IVerifyOtpByPhoneNumberData } from "../../../../../types";
import { verifyOtpForChangeOldPhoneNumber } from "../../../../../services/api/api";
import { useAppSelector } from "../../../../../hooks/reduxHooks";
import { RootState } from "../../../../../state/store";
import { AxiosError } from "axios";

const VerifyOtpForChangeOldPhoneNumber = ({ step, setStep }: TPropTypes) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const otpInfo = useAppSelector(
        (state: RootState) => state.otpInfoReducer.otpInfo
    );

    const { mutate, isLoading } = useMutation({
        mutationKey: ["verifyOtp"],

        mutationFn: async (data: IVerifyOtpByPhoneNumberData) =>
            verifyOtpForChangeOldPhoneNumber(data),

        onSuccess: async () => {
            setStep(step + 1);
            messageApi.open({
                type: "success",
                content: "Verify otp successfully.",
                duration: 3,
            });
            form.resetFields();
        },

        onError: async (err: AxiosError) => {
            const errors = err.response?.data as unknown as IErrorData;
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
                        phoneNumber: otpInfo.phoneNumber,
                        fullName: otpInfo.fullName,
                        countryCode: "91",
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

export default VerifyOtpForChangeOldPhoneNumber;
