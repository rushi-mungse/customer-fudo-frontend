import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MdAddCircle, MdListAlt } from "react-icons/md";
import { useState } from "react";
const { Sider } = Layout;

const UserSider = () => {
    const location = useLocation();
    const [curLink, setCurLink] = useState(location.pathname);
    const handleOnSelect = async (value: { key: string }) =>
        setCurLink(value.key);

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
                        label: <Link to="/user/all">All Users</Link>,
                    },
                    {
                        key: "/user/add",
                        icon: <MdAddCircle />,
                        label: <Link to="/user/add">Add User</Link>,
                    },
                ]}
                onSelect={(value) => handleOnSelect(value)}
            />
        </Sider>
    );
};

export default UserSider;
