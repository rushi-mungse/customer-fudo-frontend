import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

const Layout = () => {
    return (
        <main className="bg-bgColor">
            <Header />
            <Outlet />
            <Footer />
        </main>
    );
};

export default Layout;
