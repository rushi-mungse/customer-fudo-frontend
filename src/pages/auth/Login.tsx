import { Checkbox, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { TextBorder, Loader } from "../../components";
import { login } from "../../services/api";
import { ErrorType, LoginDataType } from "../../types";
import { ButtonUi } from "../../ui";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setAuth } from "../../state";
import { AxiosError } from "axios";

type FieldType = {
    email?: string;
    password?: string;
    remember: boolean;
};

const Login = () => {
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["Login"],
        mutationFn: async (data: LoginDataType) => login(data),
        onSuccess: async ({ data }) => {
            messageApi.open({
                type: "success",
                content: `Welcome back ${data.fullName}, Your are logged in successfully.`,
                duration: 3,
            });
            dispatch(setAuth(data));
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
                                            Login Your Account
                                        </span>
                                        <p className="text-dark/80 text-[14px] italic -tracking-tighter pt-4">
                                            Hey there! We&apos;re glad to see
                                            you again, Your journey continues
                                            here. Please take a moment to log in
                                            and dive into the healthy food and
                                            offers awaiting you.
                                        </p>
                                    </div>
                                    <Form
                                        className="flex items-center flex-col"
                                        initialValues={{ remember: true }}
                                        onFinish={(values: LoginDataType) => {
                                            mutate({
                                                email: values.email,
                                                password: values.password,
                                            });
                                        }}
                                        autoComplete="off"
                                    >
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
                                        <div className="flex items-center justify-between w-full mb-4">
                                            <Form.Item<FieldType>
                                                name="remember"
                                                valuePropName="checked"
                                            >
                                                <Checkbox>Remember me</Checkbox>
                                            </Form.Item>

                                            <Link
                                                to="/auth/forget-password/send-otp"
                                                className="text-blue-400 hover:text-blue-500 italic inline-block text-center text-sm pb-4"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <ButtonUi
                                            type="submit"
                                            intent={"tertiary"}
                                            size={"sm"}
                                            rounded={"medium"}
                                        >
                                            Login An Account
                                        </ButtonUi>
                                    </Form>

                                    <Link
                                        to="/auth/register/send-otp"
                                        className="text-blue-400 hover:text-blue-500 italic mt-8 inline-block text-center w-full text-sm"
                                    >
                                        Don&apos;t have an account?
                                    </Link>
                                    <TextBorder text="OR" />
                                    <div className="w-[100%] flex items-center justify-center">
                                        <ButtonUi
                                            intent={"secondary"}
                                            size={"xs"}
                                            rounded={"full"}
                                            leadingIcon={FcGoogle}
                                        >
                                            Login with Google
                                        </ButtonUi>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-center h-[500px]">
                                    <Loader size="large" tip="" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
