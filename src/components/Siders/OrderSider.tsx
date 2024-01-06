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

const OrderSider = () => {
    const location = useLocation();
    const [curLink, setCurLink] = useState(location.pathname);
    const navigate = useNavigate();
    const { orderId } = useParams();

    useEffect(() => setCurLink(location.pathname), [location]);

    const handleOnSelect = async (value: { key: string }) => {
        setCurLink(value.key);
        return navigate(value.key);
    };

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
                        label: "All Order",
                    },
                    {
                        key: "/order/add",
                        icon: <MdAddCircle />,
                        label: "Add Order",
                    },
                    {
                        key: `/order/edit/${orderId}`,
                        icon: <MdEdit />,
                        label: "Edit Order",
                    },
                    {
                        key: `/order/show/${orderId}`,
                        icon: <MdOutlineSlideshow />,
                        label: "Show Order",
                    },
                ]}
                onSelect={(value) => handleOnSelect(value)}
            />
        </Sider>
    );
};

export default OrderSider;
