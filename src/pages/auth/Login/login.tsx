import { Alert, Checkbox, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../ui";
import { BorderAndOr, Loader } from "../../../components";
import { login } from "../../../services/api/api";
import { ILoginData } from "../../../types";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setAuth } from "../../../state/slices/auth";

type FieldType = {
    email?: string;
    password?: string;
    remember: boolean;
};

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { mutate, isError, error, isLoading } = useMutation({
        mutationKey: ["sendOtp"],
        mutationFn: async (data: ILoginData) => login(data),
        onSuccess: async ({ data }) => {
            dispatch(setAuth(data.user));
            navigate("/");
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
                                    {isError && (
                                        <Alert
                                            style={{ marginBottom: 24 }}
                                            message={error?.message}
                                            type="error"
                                            closable
                                        />
                                    )}
                                    <Form
                                        className="flex items-center flex-col"
                                        onFinish={(values: ILoginData) => {
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
                                                to="/auth/forget-password"
                                                className="text-blue-400 hover:text-blue-500 italic inline-block text-center text-sm pb-4"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <Button
                                            type="submit"
                                            intent={"tertiary"}
                                            size={"sm"}
                                            rounded={"medium"}
                                        >
                                            Login An Account
                                        </Button>
                                    </Form>

                                    <Link
                                        to="/auth/signup"
                                        className="text-blue-400 hover:text-blue-500 italic mt-8 inline-block text-center w-full text-sm"
                                    >
                                        Don&apos;t have an account?
                                    </Link>
                                    <BorderAndOr />
                                    <div className="w-[100%] flex items-center justify-center">
                                        <Button
                                            intent={"secondary"}
                                            size={"xs"}
                                            rounded={"full"}
                                            leadingIcon={FcGoogle}
                                        >
                                            Login with Google
                                        </Button>
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
