import { Button, Form, Input, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { PropsTypes } from "../";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { sendOtpForSetNewEmail } from "../../../../services/api";
import { ErrorType } from "../../../../types";
import { setOtp } from "../../../../state";

const SendVerificationCodeNewEmail = ({ step, setStep }: PropsTypes) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["SendOtpForSetNewEmail"],

        mutationFn: async (data: { email: string }) =>
            sendOtpForSetNewEmail(data),

        onSuccess: async ({ data }) => {
            dispatch(setOtp(data.otpInfo));
            setStep(step + 1);
            messageApi.open({
                type: "success",
                content: (
                    <span>
                        Sent verification code to{" "}
                        <span className="font-bold">{data.otpInfo.email}</span>{" "}
                        email.
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
            onFinish={(values: { newEmail: string }) => {
                mutate({ email: values.newEmail });
            }}
            autoComplete="off"
            className="flex items-center justify-between py-2 gap-2"
        >
            {contextHolder}
            <Form.Item
                rules={[
                    {
                        required: true,
                        message: "Please enter your email",
                    },
                    {
                        type: "email",
                        message: "Please enter valid email",
                    },
                ]}
                style={{ width: "100%" }}
                name="newEmail"
            >
                <Input
                    placeholder="Enter your new email address"
                    prefix={<MailOutlined className="text-pure-800 pr-2" />}
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

export default SendVerificationCodeNewEmail;
