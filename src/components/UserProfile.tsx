import { Card } from "antd";
import {
    ChangeEmailAndPhoneNumber,
    ChangePassword,
    UpdateFullName,
    UploadProfilePicture,
} from "./";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../state";

const User = () => {
    const user = useAppSelector((state: RootState) => state.authReducer.user);

    return (
        <div className="h-full">
            <Card className="text-lg font-light mb-4 italic">
                <span> 🔥 Welcome back </span>
                <span className="inline-block text-active">
                    {user?.fullName}
                </span>
            </Card>
            <div className="grid grid-cols-5 gap-4">
                <section className="col-span-3">
                    <UploadProfilePicture />
                    <UpdateFullName />
                    <ChangePassword />
                </section>
                <section className="col-span-2">
                    <ChangeEmailAndPhoneNumber />
                </section>
            </div>
        </div>
    );
};

export default User;
