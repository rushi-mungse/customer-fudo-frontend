import { useState } from "react";
import { SendOtpStep, VerifyOtpStep } from "../../components";

const AddUser = () => {
    const [disabled, setDisabled] = useState(true);
    return (
        <div className="w-full h-full flex-center gap-8">
            <SendOtpStep disabled={disabled} setDisabled={setDisabled} />
            <VerifyOtpStep disabled={disabled} setDisabled={setDisabled} />
        </div>
    );
};

export default AddUser;
