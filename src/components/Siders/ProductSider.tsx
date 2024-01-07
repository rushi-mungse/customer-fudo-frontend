import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MdAddCircle, MdListAlt } from "react-icons/md";
import { useState } from "react";
const { Sider } = Layout;

const ProductSider = () => {
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
                        key: "/product/all",
                        icon: <MdListAlt />,
                        label: <Link to="/product/all">All Product</Link>,
                    },
                    {
                        key: "/product/add",
                        icon: <MdAddCircle />,
                        label: <Link to="/product/add">Add Product</Link>,
                    },
                ]}
                onSelect={(value) => handleOnSelect(value)}
            />
        </Sider>
    );
};

export default ProductSider;
