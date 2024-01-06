import { useEffect, useState } from "react";
import {
    HistoryOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    LogoutOutlined,
    FileAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useQuery } from "react-query";
import { logout } from "../../services/api";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { clearAuth } from "../../state";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

const DashBoard = ({ Outlet }: { Outlet: any }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [curLink, setCurLink] = useState<string>(location.pathname);

    useEffect(() => {
        setCurLink(location.pathname);
    }, [location]);

    const { refetch } = useQuery({
        queryFn: async () => await logout(),
        onSuccess: async () => dispatch(clearAuth()),
        enabled: false,
    });

    interface IValues {
        key: string;
    }

    const handleOnSelect = async (value: IValues) => {
        if (value.key === "logout") return await refetch();
        return navigate(value.key);
    };

    return (
        <Layout className="min-h-screen pt-12">
            <Sider trigger={null} theme="light">
                <div className="flex items-center justify-between flex-col h-full w-full">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[curLink]}
                        style={{ border: "none" }}
                        items={[
                            {
                                key: "/dashboard/profile",
                                icon: <UserOutlined />,
                                label: "User Profile",
                            },
                            {
                                key: "/dashboard/orders",
                                icon: <ShoppingCartOutlined />,
                                label: "User Orders",
                            },
                            {
                                key: "/dashboard/history",
                                icon: <HistoryOutlined />,
                                label: "Order History",
                            },
                            {
                                key: "/dashboard/add-products",
                                icon: <FileAddOutlined />,
                                label: "Add Product",
                            },
                            {
                                key: "/dashboard/products",
                                icon: <FileAddOutlined />,
                                label: "All Product",
                            },
                            {
                                key: "/dashboard/users",
                                icon: <FileAddOutlined />,
                                label: "All Users",
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
                                icon: <LogoutOutlined />,
                                label: "Log Out",
                            },
                        ]}
                        onSelect={(value) => handleOnSelect(value)}
                    />
                </div>
            </Sider>
            <Layout className="bg-gray-100/10">
                <Content
                    style={{
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {<Outlet />}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashBoard;
