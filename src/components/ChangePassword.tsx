import { Button, Form, Input, message } from "antd";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { RiLockPasswordLine } from "react-icons/ri";
import { ChangePasswordDataType, ErrorType } from "../types";
import { changePassword } from "../services/api";

interface ChangePasswordType {
    oldPassword?: string;
    newPassword?: string;
}

const ChangePassword = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["sendOtp"],
        mutationFn: async (data: ChangePasswordDataType) =>
            changePassword(data),
        onSuccess: async () => {
            messageApi.open({
                type: "success",
                content: "Password changed successfully.",
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
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 bg-pure mt-10">
            {contextHolder}
            <h1 className="text-active mb-4">Change Password</h1>
            <Form
                form={form}
                onFinish={(values: ChangePasswordDataType) => {
                    mutate({
                        oldPassword: values.oldPassword,
                        newPassword: values.newPassword,
                    });
                }}
                autoComplete="off"
            >
                <div className="grid grid-cols-2 gap-2">
                    <Form.Item<ChangePasswordType>
                        rules={[
                            {
                                required: true,
                                message: "Please enter your old password",
                            },
                        ]}
                        style={{ width: "100%" }}
                        name="oldPassword"
                    >
                        <Input.Password
                            placeholder="Enter your old password"
                            prefix={
                                <RiLockPasswordLine className="text-pure-800 pr-2 text-xl" />
                            }
                            className="font-light text-pure-800"
                        />
                    </Form.Item>
                    <Form.Item<ChangePasswordType>
                        rules={[
                            {
                                required: true,
                                message: "Please enter your new password",
                            },
                        ]}
                        style={{ width: "100%" }}
                        name="newPassword"
                    >
                        <Input.Password
                            placeholder="Enter your new password"
                            prefix={
                                <RiLockPasswordLine className="text-pure-800 pr-2 text-xl" />
                            }
                            className="font-light text-pure-800"
                        />
                    </Form.Item>
                </div>
                <div className="w-full flex justify-end">
                    <Button htmlType="submit" loading={isLoading}>
                        Change Password
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ChangePassword;
