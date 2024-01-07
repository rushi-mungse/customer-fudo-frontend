import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MdAddCircle, MdListAlt } from "react-icons/md";
import { useState } from "react";
const { Sider } = Layout;

const OrderSider = () => {
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
                        key: "/order/all",
                        icon: <MdListAlt />,
                        label: <Link to="/order/all">All Order</Link>,
                    },
                    {
                        key: "/order/add",
                        icon: <MdAddCircle />,
                        label: <Link to="/order/add">Add Order</Link>,
                    },
                ]}
                onSelect={(value) => handleOnSelect(value)}
            />
        </Sider>
    );
};

export default OrderSider;
