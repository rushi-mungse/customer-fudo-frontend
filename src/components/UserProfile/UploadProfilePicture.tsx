import { Avatar, Button, Upload, message } from "antd";
import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setAuth } from "../../state/slices/auth";
import { RootState } from "../../state";
import { uploadUserProfilePicture } from "../../services/api/client";

const UploadProfilePicture = () => {
    const user = useAppSelector((state: RootState) => state.authReducer.user);
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const onUpload = async (options) => {
        const { onSuccess, onError, file } = options;

        const fmData = new FormData();
        fmData.append("avatar", file);

        try {
            const response = await uploadUserProfilePicture(fmData);
            dispatch(setAuth(response.data.user));
            messageApi.open({
                type: "success",
                content: "Profile picture uploaded successfully.",
                duration: 3,
            });
            onSuccess();
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Something went wrong.",
                duration: 3,
            });
            onError();
        }

        return;
    };

    return (
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 bg-pure">
            <h1 className="text-active">Edit Profile Piture</h1>
            {contextHolder}
            <div className="flex mt-4 items-center justify-between">
                <div className="flex-center">
                    <div className="rounded-[100%] border-2 border-active">
                        {user?.avatar ? (
                            <Avatar size={100} src={user.avatar} />
                        ) : (
                            <Avatar size={100} icon={<AntDesignOutlined />} />
                        )}
                    </div>
                    <div className="flex flex-col ml-4">
                        <span className="text-lg font-semibold text-pure-600">
                            Upload a new profile picture
                        </span>
                        <span className="text-xs italic mt-2 text-danger-400">
                            (PNG, JPG up to 5MB)
                        </span>
                    </div>
                </div>

                <Upload
                    name="avatar"
                    maxCount={1}
                    listType="picture"
                    customRequest={onUpload}
                >
                    <Button icon={<UploadOutlined />} htmlType="submit">
                        Click to upload
                    </Button>
                </Upload>
            </div>
        </div>
    );
};

export default UploadProfilePicture;
