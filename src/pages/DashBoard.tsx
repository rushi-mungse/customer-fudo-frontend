import React, { useState } from "react";
import {
    HistoryOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    LogoutOutlined,
    FileAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useQuery } from "react-query";
import { logout } from "../services/api";
import { useAppDispatch } from "../hooks/reduxHooks";
import { clearAuth } from "../state";
import {
    UserProfile,
    Orders,
    UserOrderHistory,
    CreateProduct,
} from "../components";

const CONTENT: Record<number, JSX.Element> = {
    1: <UserProfile />,
    2: <Orders />,
    3: <UserOrderHistory />,
    4: <CreateProduct />,
};

const { Sider, Content } = Layout;

const App: React.FC = () => {
    const [content, setContent] = useState<JSX.Element>(CONTENT[1]);
    const dispatch = useAppDispatch();

    const { refetch } = useQuery({
        queryFn: async () => await logout(),
        onSuccess: async () => {
            dispatch(clearAuth());
        },
        enabled: false,
    });

    interface IValues {
        key: string;
    }

    const handleOnSelect = async (value: IValues) => {
        if (value.key === "logout") {
            return await refetch();
        }
        setContent(CONTENT[+value.key]);
    };

    return (
        <Layout className="min-h-screen pt-12">
            <Sider trigger={null} theme="light">
                <div className="flex items-center justify-between flex-col h-full w-full">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        style={{ border: "none" }}
                        items={[
                            {
                                key: "1",
                                icon: <UserOutlined />,
                                label: "User Profile",
                            },
                            {
                                key: "2",
                                icon: <ShoppingCartOutlined />,
                                label: "Orders",
                            },
                            {
                                key: "3",
                                icon: <HistoryOutlined />,
                                label: "Order History",
                            },
                            {
                                key: "4",
                                icon: <FileAddOutlined />,
                                label: "Add Product",
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
                    {content}
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
