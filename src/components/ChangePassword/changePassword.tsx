import { Button, Form, Input, message } from "antd";
import { RiLockPasswordLine } from "react-icons/ri";
import { useMutation } from "react-query";
import { IChangePasswordData, IError } from "../../types";
import { changePassword } from "../../services/api/api";

interface ChangePasswordType {
    oldPassword?: string;
    newPassword?: string;
}

const ChangePassword = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isError, error, isLoading, isSuccess } = useMutation({
        mutationKey: ["sendOtp"],
        mutationFn: async (data: IChangePasswordData) => changePassword(data),
        onSuccess: async () => {
            messageApi.open({
                type: "success",
                content: "Password changed successfully.",
                duration: 3,
            });
            form.resetFields();
        },
    });

    if (isError) {
        messageApi.open({
            type: "error",
            content: (error as IError)?.message,
            duration: 3,
        });
    }

    return (
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 bg-pure mt-10">
            {contextHolder}
            <h1 className="text-active mb-4">Change Password</h1>
            <Form
                form={form}
                onFinish={(values: IChangePasswordData) => {
                    mutate({
                        oldPassword: values.oldPassword,
                        newPassword: values.newPassword,
                    });
                    if (isSuccess) setTimeout(() => form.resetFields(), 1000);
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
