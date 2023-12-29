import {
    ChangeEmailAndPhoneNumber,
    ChangePassword,
    UpdateFullName,
    UploadProfilePicture,
} from "../";

const User = () => {
    return (
        <div className="h-full">
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
