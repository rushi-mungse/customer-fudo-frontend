import { Alert, Form, Input, Spin } from "antd";
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    CheckSquareOutlined,
} from "@ant-design/icons";
import { useMutation } from "react-query";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../ui";
import { BorderAndOr } from "../../../components";
import { sendOtp } from "../../../services/api/api";
import { IError, ISendOtpData } from "../../../types";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setOtpInfo } from "../../../state/slices/otpInfo";

type FieldType = {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { mutate, isError, error, isLoading } = useMutation({
        mutationKey: ["sendOtp"],
        mutationFn: async (data: ISendOtpData) => sendOtp(data),
        onSuccess: async ({ data }) => {
            dispatch(setOtpInfo(data));
            navigate("/auth/otp-verification");
        },
    });

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center w-full h-screen">
                <div className="flex items-center justify-center w-full bg-pure rounded-lg">
                    <div className="w-1/2 bg-secondary items-center justify-center rounded-md">
                        <div className="h-full w-full items-center justify-center">
                            <img src="/delivery.svg" alt="delivery" />
                        </div>
                    </div>

                    <div className="w-1/2">
                        <div className="flex items-center justify-center flex-col ring-1 ring-dark/20 py-10 rounded-md shadow-md shadow-dark/40">
                            {!isLoading ? (
                                <div className="w-[350px]">
                                    <div className="mb-8">
                                        <span className="text-3xl font-bold text-active">
                                            Sign Up Your Account
                                        </span>
                                        <p className="text-dark/80 text-[14px] italic -tracking-tighter pt-4">
                                            To keep connected with us please
                                            signup with your personal
                                            information by email address and
                                            password.
                                        </p>
                                    </div>
                                    {isError && (
                                        <Alert
                                            style={{ marginBottom: 24 }}
                                            message={(error as IError)?.message}
                                            type="error"
                                            closable
                                        />
                                    )}
                                    <Form
                                        className="flex items-center flex-col"
                                        onFinish={(values: ISendOtpData) => {
                                            mutate({
                                                fullName: values.fullName,
                                                email: values.email,
                                                password: values.password,
                                                confirmPassword:
                                                    values.confirmPassword,
                                            });
                                        }}
                                        autoComplete="off"
                                    >
                                        <Form.Item<FieldType>
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter your full name",
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
                                                    message:
                                                        "Please enter your email",
                                                },
                                                {
                                                    type: "email",
                                                    message:
                                                        "Please enter valid email",
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
                                                    message:
                                                        "Please enter password",
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
                                                    message:
                                                        "Please enter confirm password",
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
                                        <Button
                                            type="submit"
                                            intent={"tertiary"}
                                            size={"sm"}
                                            rounded={"medium"}
                                        >
                                            Create An Account
                                        </Button>
                                    </Form>

                                    <Link
                                        to="/auth/login"
                                        className="text-blue-400 hover:text-blue-500 italic mt-12 inline-block text-center w-full text-sm"
                                    >
                                        Do you have an account?
                                    </Link>
                                    <BorderAndOr />
                                    <div className="w-[100%] flex items-center justify-center">
                                        <Button
                                            intent={"secondary"}
                                            size={"xs"}
                                            rounded={"full"}
                                            leadingIcon={FcGoogle}
                                        >
                                            Sign up with Google
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-center h-[500px]">
                                    <Spin tip="" size="large">
                                        <div className="content" />
                                    </Spin>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
