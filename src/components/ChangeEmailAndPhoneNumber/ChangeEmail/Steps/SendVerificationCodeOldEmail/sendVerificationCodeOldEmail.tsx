import { Button, message } from "antd";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { RootState } from "../../../../../state/store";
import { TPropTypes } from "../../";
import { useMutation } from "react-query";
import { IEmailData, IErrorData } from "../../../../../types";
import { sendVerificationCodeOldEmail } from "../../../../../services/api/api";
import { setOtpInfo } from "../../../../../state/slices/otpInfo";
import { AxiosError } from "axios";

const SendVerificationCodeOldEmail = ({ step, setStep }: TPropTypes) => {
    const user = useAppSelector((state: RootState) => state.authReducer.user);
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["sendOtp"],
        mutationFn: async (data: IEmailData) =>
            sendVerificationCodeOldEmail(data),
        onSuccess: async ({ data }) => {
            dispatch(setOtpInfo(data.otpInfo));
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
            const errors = err.response?.data as unknown as IErrorData;
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
            <span> {user?.email}</span>
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

export default SendVerificationCodeOldEmail;
