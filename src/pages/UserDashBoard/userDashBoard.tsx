import React, { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HistoryOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { useQuery } from "react-query";
import { logout } from "../../services/api/api";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { clearAuth } from "../../state/slices/auth";
import { User, Orders, UserHistory } from "../../components";

const CONTENT: Record<number, JSX.Element> = {
    1: <User />,
    2: <Orders />,
    3: <UserHistory />,
};

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
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
        if (value.key === "4") {
            return await refetch();
        }
        setContent(CONTENT[+value.key]);
    };

    return (
        <Layout className="min-h-screen pt-12">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
            >
                <div className="flex items-center justify-between flex-col h-full w-full">
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
                        style={{ border: "none", padding: 0, margin: 0 }}
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
            <Layout className="bg-gray-100/10">
                <Header
                    style={{
                        padding: "5px 0",
                        height: 40,
                    }}
                    className="bg-gray-100/10"
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
                    }}
                >
                    {content}
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
