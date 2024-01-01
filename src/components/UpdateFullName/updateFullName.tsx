import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { LuClipboardType } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../state/store";
import { useMutation } from "react-query";
import { IErrorData, IUpdateFullNameData } from "../../types";
import { updateFullName } from "../../services/api/api";
import { setAuth } from "../../state/slices/auth";
import { AxiosError } from "axios";

interface FieldType {
    fullName?: string;
    email?: string;
    phoneNumber?: string | null;
    role?: string;
}

const UpdateFullName = () => {
    const { user } = useAppSelector((state: RootState) => state.authReducer);
    const distpatch = useAppDispatch();

    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["updateFullName"],
        mutationFn: async (data: IUpdateFullNameData) => updateFullName(data),
        onSuccess: async ({ data }) => {
            distpatch(setAuth(data.user));
            messageApi.open({
                type: "success",
                content: (
                    <span>
                        User fullname{" "}
                        <span className="font-bold">{data.user.fullName}</span>{" "}
                        updated successfully.
                    </span>
                ),
                duration: 3,
            });
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
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 bg-pure mt-10">
            <h1 className="text-active mb-4">Update Full Name</h1>
            {contextHolder}
            <Form
                onFinish={(values: FieldType) => {
                    mutate({ fullName: values.fullName! });
                }}
                autoComplete="off"
                initialValues={{
                    fullName: user?.fullName,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber,
                    role: user?.role,
                }}
            >
                <div className="grid grid-cols-2 gap-2">
                    <Form.Item<FieldType>
                        rules={[
                            {
                                required: true,
                                message: "Please enter your full name",
                            },
                        ]}
                        name="fullName"
                        style={{
                            width: "100%",
                        }}
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
                            disabled
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        style={{ width: "100%" }}
                        name="phoneNumber"
                    >
                        <Input
                            placeholder="Enter phone number"
                            prefix={
                                <PhoneOutlined className="text-pure-800 pr-2" />
                            }
                            className="font-light text-pure-800"
                            disabled
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        rules={[
                            {
                                required: true,
                                message: "Please enter role",
                            },
                        ]}
                        style={{ width: "100%" }}
                        name="role"
                    >
                        <Input
                            placeholder="Enter your role"
                            prefix={
                                <LuClipboardType className="text-pure-800 pr-2 text-2xl" />
                            }
                            className="font-light text-pure-800"
                            disabled
                        />
                    </Form.Item>
                </div>
                <div className="w-full flex justify-end">
                    <Button loading={isLoading} htmlType="submit">
                        Update Full Name
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default UpdateFullName;
