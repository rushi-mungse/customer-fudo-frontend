import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import useRefreshHook from "./hooks/useRefresh";
import { Spin } from "antd";

const Layout = () => {
    const { loading } = useRefreshHook();

    return (
        <main className="bg-bgColor">
            {loading ? (
                <Spin tip="" size="large">
                    <div className="content" />
                </Spin>
            ) : (
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            )}
        </main>
    );
};

export default Layout;
