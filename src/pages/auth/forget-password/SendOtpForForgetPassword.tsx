import { useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import { useMutation } from "react-query";
import { MailOutlined } from "@ant-design/icons";
import { ButtonUi } from "../../../ui";
import { forgetPassword } from "../../../services/api";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setOtp } from "../../../state";
import { AxiosError } from "axios";
import { ErrorType } from "../../../types";

const ForgetPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate } = useMutation({
        mutationKey: ["ForgetPassword"],
        mutationFn: async (data: { email: string }) => forgetPassword(data),
        onSuccess: async ({ data }) => {
            dispatch(setOtp({ ...data, fullName: null }));
            navigate("/auth/forget-password/verify-otp");
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
        <div className="container mx-auto">
            {contextHolder}
            <div className="flex items-center justify-center w-full h-screen">
                <div className="flex items-center justify-center w-full bg-pure rounded-lg">
                    <div className="w-1/2 flex items-center justify-center">
                        <div className="h-[100%] w-[100%] md:flex items-center justify-center">
                            <img src="/delivery.svg" alt="delivery" />
                        </div>
                    </div>
                    <div className="md:w-1/2 flex items-center justify-center flex-col py-4 md:py-8">
                        <div className="w-[350px]">
                            <div className="mb-8">
                                <span className="text-3xl font-bold text-active">
                                    Forget Password
                                </span>
                                <p className="text-dark/80 text-[14px] italic -tracking-tighter pt-4 leading-5 text-justify">
                                    Oh no! It happens to the best of us. If
                                    you've forgotten your password, don't worry
                                    - we've got you covered. Follow the simple
                                    steps below to reset your password and
                                    regain access to your account.
                                </p>
                            </div>
                            <Form
                                className="flex items-center flex-col"
                                onFinish={(values) => {
                                    mutate({ email: values.email });
                                }}
                                autoComplete="off"
                            >
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
                                <ButtonUi
                                    type="submit"
                                    intent={"tertiary"}
                                    size={"sm"}
                                    rounded={"medium"}
                                >
                                    Reset Password
                                </ButtonUi>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
