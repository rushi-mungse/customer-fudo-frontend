import { Button, message } from "antd";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState, setOtp } from "../../../../state";
import { ErrorType } from "../../../../types";
import { PropsTypes } from "../";
import { sendOtpForChangeOldEmail } from "../../../../services/api";

const SendOtpToOldEmail = ({ step, setStep }: PropsTypes) => {
    const user = useAppSelector((state: RootState) => state.authReducer.user);
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["SendOtpToOldEmail"],

        mutationFn: async (data: { email: string }) =>
            sendOtpForChangeOldEmail(data),

        onSuccess: async ({ data }) => {
            dispatch(setOtp(data.otpInfo));
            setStep(step + 1);
            messageApi.open({
                type: "success",
                content: (
                    <span>
                        Send verification otp to{" "}
                        <span className="font-bold">{user?.email}</span> email
                    </span>
                ),
                duration: 3,
            });
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

    const handleOnClick = async () => {
        if (!user?.email) {
            messageApi.open({
                type: "error",
                content: <span>Something went wrong (email not found)</span>,
                duration: 3,
            });
            return;
        }
        mutate({ email: user?.email });
    };

    return (
        <div className="py-2 flex items-center justify-between mb-2">
            {contextHolder}
            <span className="font-light tracking-wide italic">
                {" "}
                {user?.email}
            </span>
            <Button
                disabled={step !== 0}
                onClick={handleOnClick}
                loading={isLoading}
            >
                Send Otp
            </Button>
        </div>
    );
};

export default SendOtpToOldEmail;
