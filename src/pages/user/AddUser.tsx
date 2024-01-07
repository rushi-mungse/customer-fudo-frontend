import { useState } from "react";
import { SendOtpStep, VerifyOtpStep } from "../../components";
import { Card } from "antd";

const AddUser = () => {
    const [disabled, setDisabled] = useState(true);
    return (
        <>
            <Card className="mb-8">
                <span className="text-active font-bold">Add User</span>
            </Card>
            <div className="flex-center gap-8">
                <SendOtpStep disabled={disabled} setDisabled={setDisabled} />
                <VerifyOtpStep disabled={disabled} setDisabled={setDisabled} />
            </div>
        </>
    );
};

export default AddUser;
