import { Button, Form, Input, Select, Spin, message } from "antd";
import { AxiosError } from "axios";
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    CheckSquareOutlined,
} from "@ant-design/icons";
import { useMutation } from "react-query";
import { sendOtpForUserRegister } from "../../services/api";
import { ErrorType, RegisterSendOtpDataType } from "../../types";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setOtp } from "../../state";

type FieldType = {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
};

const SendOtpStep = ({
    disabled,
    setDisabled,
}: {
    disabled: boolean;
    setDisabled: (set: boolean) => void;
}) => {
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["SendVerificationCode"],
        mutationFn: async (data: RegisterSendOtpDataType) =>
            sendOtpForUserRegister(data),
        onSuccess: async ({ data }) => {
            dispatch(setOtp(data));
            setDisabled(false);
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

    return (
        <div>
            {contextHolder}
            {!isLoading ? (
                <div className="w-[400px] h-[450px] flex items-center justify-center flex-col ring-1 ring-pure-600/10 p-10 rounded-md bg-pure">
                    <div className="mb-8">
                        <span className="text-2xl font-medium text-active tracking-wider">
                            Sign Up User Account
                        </span>
                    </div>
                    <Form
                        className="flex items-center flex-col w-full"
                        onFinish={(values: RegisterSendOtpDataType) => {
                            mutate({
                                fullName: values.fullName,
                                email: values.email,
                                password: values.password,
                                confirmPassword: values.confirmPassword,
                                role: values.role,
                            });
                        }}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your full name",
                                },
                            ]}
                            name="fullName"
                            style={{ width: "100%" }}
                        >
                            <Input
                                placeholder="Enter your full name"
                                prefix={
                                    <UserOutlined className="text-pure-800 pr-2" />
                                }
                                className="font-light text-pure-80"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
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
                            name="email"
                        >
                            <Input
                                placeholder="Enter your email address"
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
                                    message: "Please enter role",
                                },
                            ]}
                            name="role"
                            style={{ width: "100%" }}
                        >
                            <Select
                                placeholder="Enter user role"
                                style={{ width: "100%" }}
                                options={[
                                    {
                                        value: "customer",
                                        label: "customer",
                                    },
                                    {
                                        value: "admin",
                                        label: "admin",
                                    },
                                ]}
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
                            name="password"
                        >
                            <Input.Password
                                placeholder="Enter password"
                                prefix={
                                    <LockOutlined className="text-pure-800 pr-2" />
                                }
                                className="font-light text-pure-800"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter confirm password",
                                },
                            ]}
                            style={{ width: "100%" }}
                            name="confirmPassword"
                        >
                            <Input.Password
                                placeholder="Confirm password"
                                prefix={
                                    <CheckSquareOutlined className="text-pure-800 pr-2" />
                                }
                                className="font-light text-pure-800"
                            />
                        </Form.Item>

                        <Button htmlType="submit" disabled={!disabled}>
                            Create An Account
                        </Button>
                    </Form>
                </div>
            ) : (
                <div className="flex-center h-[500px]">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            )}
        </div>
    );
};

export default SendOtpStep;
