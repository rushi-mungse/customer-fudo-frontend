import { Button, Form, Input, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { TPropTypes } from "../";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { sendOtpForSetNewPhoneNumber } from "../../../../services/api";
import { ErrorType, PhoneNumberDataType } from "../../../../types";
import { setOtp } from "../../../../state";

const SendOtpForSetNewPhoneNumber = ({ step, setStep }: TPropTypes) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["sendOtp"],
        mutationFn: async (data: PhoneNumberDataType) =>
            sendOtpForSetNewPhoneNumber(data),
        onSuccess: async ({ data }) => {
            dispatch(setOtp(data.otpInfo));
            setStep(step + 1);
            messageApi.open({
                type: "success",
                content: (
                    <span>
                        Sent verification code to{" "}
                        <span className="font-bold">
                            {data.otpInfo.phoneNumber}
                        </span>{" "}
                        phone number.
                    </span>
                ),
                duration: 3,
            });
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
        <Form
            form={form}
            onFinish={(values: { newPhoneNumber: string }) => {
                mutate({
                    phoneNumber: values.newPhoneNumber,
                    countryCode: "91",
                });
            }}
            autoComplete="off"
            className="flex items-center justify-between py-2 gap-2"
        >
            {contextHolder}
            <Form.Item
                rules={[
                    {
                        required: true,
                        message: "Please enter your new phone number",
                    },
                ]}
                style={{ width: "100%" }}
                name="newPhoneNumber"
            >
                <Input
                    placeholder="Enter your new phone number"
                    prefix={<PhoneOutlined className="text-pure-800 pr-2" />}
                    className="font-light text-pure-800"
                    disabled={step !== 2}
                />
            </Form.Item>
            <Button
                className="mb-6"
                disabled={step !== 2}
                htmlType="submit"
                loading={isLoading}
            >
                Change
            </Button>
        </Form>
    );
};

export default SendOtpForSetNewPhoneNumber;
