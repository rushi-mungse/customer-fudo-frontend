import { Button, message } from "antd";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { TPropTypes } from "../";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../state";
import { ErrorType, PhoneNumberDataType } from "../../../../types";
import { sendOtpForChangeOldPhoneNumber } from "../../../../services/api";
import { setOtp } from "../../../../state";

const SendOtpForChangeOldPhoneNumber = ({ step, setStep }: TPropTypes) => {
    const user = useAppSelector((state: RootState) => state.authReducer.user);
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["SendOtpForChangeOldPhoneNumber"],

        mutationFn: async (data: PhoneNumberDataType) =>
            sendOtpForChangeOldPhoneNumber(data),

        onSuccess: async ({ data }) => {
            dispatch(setOtp(data.otpInfo));
            setStep(step + 1);

            messageApi.open({
                type: "success",
                content: (
                    <span>
                        Send verification otp to{" "}
                        <span className="font-bold">{user?.phoneNumber}</span>{" "}
                        phone number.
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
        if (!user?.phoneNumber) {
            messageApi.open({
                type: "error",
                content: (
                    <span>Something went wrong (phone number not found)</span>
                ),
                duration: 3,
            });
            return;
        }
        mutate({ phoneNumber: user?.phoneNumber, countryCode: "91" });
    };

    return (
        <div className="py-2 flex items-center justify-between mb-2">
            {contextHolder}
            <span className="font-light tracking-wide italic">
                {" "}
                {user?.phoneNumber}
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

export default SendOtpForChangeOldPhoneNumber;
