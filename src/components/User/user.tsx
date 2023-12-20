import { Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

const User = () => {
    return (
        <div className="">
            <div className="border-b border-pure-800/30">
                <h1 className="text-active text-2xl">Account </h1>
                <p>Manage your profile</p>
            </div>
            <div className="flex mt-4">
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<AntDesignOutlined />}
                />
                <div className="flex flex-col ml-10">
                    <h1 className="text-2xl">Profile Piture</h1>
                    <span>PNG, JPG up to 5MB</span>
                    <div className="text-active">
                        <input
                            type="text"
                            className="hidden"
                            id="uploadProfilePicture"
                        />
                        <label htmlFor="uploadProfilePicture">Upload</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
