import { Avatar, Button, Form, Input, Upload } from "antd";
import {
    AntDesignOutlined,
    UploadOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import { LuClipboardType } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../state/store";
import { Button as ButtonUi } from "../../ui";
import ChangeEmailAndPhoneNumber from "../ChangeEmailAndPhoneNumber/changeEmailAndPhoneNumber";

interface FieldType {
    fullName?: string;
    email?: string;
    phoneNumber?: string | null;
    role?: string;
}

interface ChangePasswordType {
    oldPassword?: string;
    newPassword?: string;
}

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const User = () => {
    const { user } = useAppSelector((state: RootState) => state.authReducer);

    return (
        <div className="h-full">
            <div className="grid grid-cols-5 gap-4">
                <section className="col-span-3">
                    {/* edit profile picture */}
                    <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 bg-pure">
                        <h1 className="text-active">Edit Profile Piture</h1>
                        <div className="flex mt-4 items-center justify-between">
                            <div className="flex-center">
                                <div className="rounded-[100%] border-2 border-active">
                                    <Avatar
                                        size={100}
                                        icon={<AntDesignOutlined />}
                                    />
                                </div>
                                <div className="flex flex-col ml-4">
                                    <span className="text-lg font-semibold text-pure-600">
                                        Upload a new profile picture
                                    </span>
                                    <span className="text-xs italic mt-2 text-danger-400">
                                        (PNG, JPG up to 5MB)
                                    </span>
                                </div>
                            </div>
                            <Form className="flex flex-col ml-10">
                                <Form.Item
                                    name="photo"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Upload
                                        name="photo"
                                        maxCount={1}
                                        listType="picture"
                                    >
                                        <Button icon={<UploadOutlined />}>
                                            Click to upload
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    {/* update user profile  */}
                    <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 bg-pure mt-10">
                        <h1 className="text-active mb-4">Update Profile</h1>
                        <Form
                            onFinish={() => {}}
                            autoComplete="off"
                            initialValues={{
                                fullName: user?.fullName,
                                email: user?.email,
                                phoneNumber: null,
                                role: user?.role,
                            }}
                        >
                            <div className="grid grid-cols-2 gap-2">
                                <Form.Item<FieldType>
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter your full name",
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
                                <ButtonUi
                                    type="submit"
                                    intent={"tertiary"}
                                    size={"sm"}
                                    rounded={"full"}
                                >
                                    Update Profile
                                </ButtonUi>
                            </div>
                        </Form>
                    </div>
                    {/* change password  */}
                    <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 bg-pure mt-10">
                        <h1 className="text-active mb-4">Change Password</h1>
                        <Form onFinish={() => {}} autoComplete="off">
                            <div className="grid grid-cols-2 gap-2">
                                <Form.Item<ChangePasswordType>
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter your old password",
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
                                            message:
                                                "Please enter your new password",
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
                                <ButtonUi
                                    type="submit"
                                    intent={"tertiary"}
                                    size={"sm"}
                                    rounded={"full"}
                                >
                                    Change Password
                                </ButtonUi>
                            </div>
                        </Form>
                    </div>
                </section>

                <section className="col-span-2">
                    <ChangeEmailAndPhoneNumber />
                </section>
            </div>
        </div>
    );
};

export default User;
