import { Avatar, Tooltip } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";

const Review = () => {
    return (
        <Avatar.Group>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
            <Tooltip title="Ant User" placement="top">
                <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                />
            </Tooltip>
            <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<AntDesignOutlined />}
            />
        </Avatar.Group>
    );
};

export default Review;
