import { Button, Form, Input, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { TPropTypes } from "../../";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { useMutation } from "react-query";
import { sendOtpForSetNewPhoneNumber } from "../../../../../services/api/api";
import { IErrorData, ISendOtpByPhoneNumberData } from "../../../../../types";
import { setOtpInfo } from "../../../../../state/slices/otpInfo";
import { AxiosError } from "axios";

const SendOtpForSetNewPhoneNumber = ({ step, setStep }: TPropTypes) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["sendOtp"],

        mutationFn: async (data: ISendOtpByPhoneNumberData) =>
            sendOtpForSetNewPhoneNumber(data),

        onSuccess: async ({ data }) => {
            dispatch(setOtpInfo(data.otpInfo));
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
            const errors = err.response?.data as unknown as IErrorData;
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
