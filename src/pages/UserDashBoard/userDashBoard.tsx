import React, { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HistoryOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useQuery } from "react-query";
import { logout } from "../../services/api/api";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { clearAuth } from "../../state/slices/auth";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const dispatch = useAppDispatch();

    const { refetch } = useQuery({
        queryKey: ["tenantData"],
        queryFn: async () => await logout(),
        onSuccess: async () => {
            dispatch(clearAuth());
        },
        enabled: false,
    });

    const handleOnSelect = async (value) => {
        if (value.key === "4") refetch();
    };

    return (
        <Layout className="min-h-screen pt-12">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                className="border-r-[.5px] border-pure-600/30"
            >
                <div className="flex items-center justify-between flex-col h-full">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        style={{ border: "none" }}
                        items={[
                            {
                                key: "1",
                                icon: <UserOutlined />,
                                label: "User",
                            },
                            {
                                key: "2",
                                icon: <ShoppingCartOutlined />,
                                label: "Orders",
                            },
                            {
                                key: "3",
                                icon: <HistoryOutlined />,
                                label: "History",
                            },
                        ]}
                        onSelect={(value) => handleOnSelect(value)}
                    />
                    <Menu
                        mode="inline"
                        style={{ border: "none" }}
                        items={[
                            {
                                key: "4",
                                icon: <LogoutOutlined />,
                                label: "Log Out",
                            },
                        ]}
                        onSelect={(value) => handleOnSelect(value)}
                    />
                </div>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: "5px 0",
                        background: colorBgContainer,
                        height: 40,
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "20px",
                            width: 30,
                            height: 30,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 10,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
