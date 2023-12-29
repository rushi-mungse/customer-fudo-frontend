import { Form, Input } from "antd";
import { RiLockPasswordLine } from "react-icons/ri";
import { Button as ButtonUi } from "../../ui";

interface ChangePasswordType {
    oldPassword?: string;
    newPassword?: string;
}

const ChangePassword = () => {
    return (
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 bg-pure mt-10">
            <h1 className="text-active mb-4">Change Password</h1>
            <Form onFinish={() => {}} autoComplete="off">
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
    );
};

export default ChangePassword;
