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

const ProductSider = () => {
    const location = useLocation();
    const [curLink, setCurLink] = useState(location.pathname);
    const navigate = useNavigate();
    const { productId } = useParams();

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
                        key: "/product/all",
                        icon: <MdListAlt />,
                        label: "All Product",
                    },
                    {
                        key: "/product/add",
                        icon: <MdAddCircle />,
                        label: "Add Product",
                    },
                    {
                        key: `/product/edit/${productId}`,
                        icon: <MdEdit />,
                        label: "Edit Product",
                    },
                    {
                        key: `/product/show/${productId}`,
                        icon: <MdOutlineSlideshow />,
                        label: "Show Product",
                    },
                ]}
                onSelect={(value) => handleOnSelect(value)}
            />
        </Sider>
    );
};

export default ProductSider;
