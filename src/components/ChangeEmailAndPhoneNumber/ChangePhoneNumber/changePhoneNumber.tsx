import { Button, Form, Input, Steps } from "antd";
import { InputOTP } from "antd-input-otp";
import { MailOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../state/store";

interface FieldType {
    otp?: string;
    phoneNumber?: number;
}

const ChangePhoneNumber = () => {
    const { user } = useAppSelector((state: RootState) => state.authReducer);
    return (
        <Steps
            direction="vertical"
            size="small"
            current={0}
            items={[
                {
                    title: (
                        <span className="text-active">
                            Send verification code
                        </span>
                    ),
                    description: (
                        <div className="py-2 flex items-center justify-between mb-2">
                            <span> {user?.email}</span>
                            <Button>Send Otp</Button>
                        </div>
                    ),
                },
                {
                    title: (
                        <div>
                            <span className="text-active">
                                Enter verification code sent to{" "}
                            </span>
                            <span className="text-dark font-pure-600/50">
                                {user?.email}
                            </span>
                        </div>
                    ),
                    description: (
                        <div className="py-2">
                            <Form
                                onFinish={() => {}}
                                className="flex items-center justify-between py-2"
                            >
                                <Form.Item<FieldType> name="otp">
                                    <InputOTP
                                        inputType="numeric"
                                        length={4}
                                        inputStyle={{
                                            height: 40,
                                            width: 40,
                                            fontSize: 16,
                                            padding: 4,
                                        }}
                                    />
                                </Form.Item>
                                <Button disabled className="mb-6">
                                    Verify Otp
                                </Button>
                            </Form>
                        </div>
                    ),
                },
                {
                    title: (
                        <span className="text-active">
                            Enter your new phone number
                        </span>
                    ),
                    description: (
                        <Form
                            onFinish={() => {}}
                            autoComplete="off"
                            className="flex items-center justify-between py-2 gap-2"
                        >
                            <Form.Item<FieldType>
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter your new phone number",
                                    },
                                ]}
                                style={{ width: "100%" }}
                                name="phoneNumber"
                            >
                                <Input
                                    placeholder="Enter your new phone number"
                                    prefix={
                                        <MailOutlined className="text-pure-800 pr-2" />
                                    }
                                    className="font-light text-pure-800"
                                />
                            </Form.Item>
                            <Button className="mb-6" disabled>
                                Change
                            </Button>
                        </Form>
                    ),
                },
                {
                    title: (
                        <div>
                            <span className="text-active">
                                Enter verification code sent to{" "}
                            </span>
                            <span className="text-dark font-pure-600/50">
                                {user?.email}
                            </span>
                        </div>
                    ),
                    description: (
                        <div className="py-2">
                            <Form
                                onFinish={() => {}}
                                className="flex items-center justify-between py-2"
                            >
                                <Form.Item name="otp">
                                    <InputOTP
                                        inputType="numeric"
                                        length={4}
                                        inputStyle={{
                                            height: 40,
                                            width: 40,
                                            fontSize: 16,
                                            padding: 4,
                                        }}
                                    />
                                </Form.Item>
                                <Button disabled className="mb-4">
                                    Verify Otp
                                </Button>
                            </Form>
                        </div>
                    ),
                },
            ]}
        />
    );
};

export default ChangePhoneNumber;
