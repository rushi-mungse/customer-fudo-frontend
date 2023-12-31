import { Button, Form, message } from "antd";
import { AxiosError } from "axios";
import { InputOTP } from "antd-input-otp";
import { useMutation } from "react-query";
import { TPropTypes } from "../";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../state";
import { ErrorType, PhoneNumberVerifyOtpDataType } from "../../../../types";
import { verifyOtpForSetPhoneNumber } from "../../../../services/api";
import { setAuth, clearOtp } from "../../../../state";

const VerifyOtpForSetNewPhoneNumber = ({ step, setStep }: TPropTypes) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const otpInfo = useAppSelector((state: RootState) => state.otpReducer.otp);
    const dispatch = useAppDispatch();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["VerifyOtpForSetNewPhoneNumber"],
        mutationFn: async (data: PhoneNumberVerifyOtpDataType) =>
            verifyOtpForSetPhoneNumber(data),
        onSuccess: async ({ data }) => {
            dispatch(setAuth(data.user));
            setStep(0);
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
                        phoneNumber: otpInfo?.phoneNumber,
                        fullName: otpInfo?.fullName,
                        hashOtp: otpInfo?.hashOtp,
                        otp: joinOtp,
                        countryCode: "91",
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

export default VerifyOtpForSetNewPhoneNumber;
