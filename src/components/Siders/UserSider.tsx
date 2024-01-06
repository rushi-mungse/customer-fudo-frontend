import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
    MdAddCircle,
    MdOutlineSlideshow,
    MdEdit,
    MdListAlt,
} from "react-icons/md";
import { useEffect, useState } from "react";
const { Sider } = Layout;

const UserSider = () => {
    const location = useLocation();
    const [curLink, setCurLink] = useState(location.pathname);
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => setCurLink(location.pathname), [location]);

    const handleOnSelect = async (value: { key: string }) => {
        setCurLink(value.key);
        navigate(value.key);
    };

    return (
        <Sider trigger={null} theme="light">
            <Menu
                mode="inline"
                defaultSelectedKeys={[curLink]}
                style={{ border: "none" }}
                items={[
                    {
                        key: "/user/all",
                        icon: <MdListAlt />,
                        label: "All Users",
                    },
                    {
                        key: "/user/add",
                        icon: <MdAddCircle />,
                        label: "Add User",
                    },
                    {
                        key: `/user/edit/${userId}`,
                        icon: <MdEdit />,
                        label: "Edit User",
                    },
                    {
                        key: `/user/show/${userId}`,
                        icon: <MdOutlineSlideshow />,
                        label: "Show User",
                    },
                ]}
                onSelect={(value) => handleOnSelect(value)}
            />
        </Sider>
    );
};

export default UserSider;
