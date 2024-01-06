import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useQuery } from "react-query";
import { logout } from "../../services/api";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { clearAuth } from "../../state";
import { FaUser } from "react-icons/fa6";
import { MdRestaurantMenu, MdShoppingCart, MdLogout } from "react-icons/md";

const { Sider } = Layout;

interface PropsType {
    pathname: string;
}

const LeftSider = ({ pathname }: PropsType) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { refetch } = useQuery({
        queryFn: async () => await logout(),
        onSuccess: async () => dispatch(clearAuth()),
        enabled: false,
    });

    const handleOnSelect = async (value: { key: string }) => {
        if (value.key === "logout") return await refetch();
        navigate(`/${value.key}/all`);
    };

    return (
        <Sider trigger={null} theme="light">
            <div className="flex justify-between flex-col h-full">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    style={{ border: "none" }}
                    items={[
                        {
                            key: "user",
                            icon: <FaUser />,
                            label: "Users",
                        },
                        {
                            key: "order",
                            icon: <MdShoppingCart />,
                            label: "Orders",
                        },
                        {
                            key: "product",
                            icon: <MdRestaurantMenu />,
                            label: "Product",
                        },
                    ]}
                    onSelect={(value) => handleOnSelect(value)}
                />
                <Menu
                    mode="inline"
                    style={{ border: "none", padding: 0, margin: 0 }}
                    items={[
                        {
                            key: "logout",
                            icon: <MdLogout />,
                            label: "Log Out",
                        },
                    ]}
                    onSelect={(value) => handleOnSelect(value)}
                />
            </div>
        </Sider>
    );
};

export default LeftSider;
