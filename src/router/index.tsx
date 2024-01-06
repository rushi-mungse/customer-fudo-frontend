import { RootState } from "../state";
import { useAppSelector } from "../hooks/reduxHooks";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
} from "react-router-dom";
import {
    Footer,
    Header,
    LeftSider,
    OrderSider,
    ProductSider,
    UserSider,
} from "../components";
import { Home, Menu, Stores, Contact } from "../pages";
import { AddUser, AllUsers, ShowUser, EditUser } from "../pages/user";
import {
    AddProduct,
    AllProducts,
    EditProduct,
    ShowProduct,
} from "../pages/product";
import {
    Login,
    SendOtpForForgetPassword,
    SendOtpForRegisterEmail,
    VerifyOtpForForgetPassword,
    VerifyOtpForRegisterEmail,
} from "../pages/auth";
import { AddOrder, AllOrders, EditOrder, ShowOrder } from "../pages/order";
import { Layout } from "antd";

const GuestRoute = () => {
    return (
        <main className="bg-bgColor">
            <Header />
            <Outlet />
            <Footer />
        </main>
    );
};

const AuthRoute = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );
    if (isAuth) return <Navigate to="/" />;
    return (
        <main className="bg-bgColor">
            <Header />
            <Outlet />
            <Footer />
        </main>
    );
};

const OrderRoute = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );
    return !isAuth ? (
        <Navigate to="/" />
    ) : (
        <main className="bg-bgColor">
            <Header />
            <Layout className="min-h-screen pt-12 flex justify-between w-full">
                <LeftSider pathname="order" />
                <div className="w-full p-4">
                    <Outlet />
                </div>
                <OrderSider />
            </Layout>
        </main>
    );
};

const UserRoute = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );
    return !isAuth ? (
        <Navigate to="/" />
    ) : (
        <main className="bg-bgColor">
            <Header />
            <Layout className="min-h-screen pt-12 flex justify-between w-full">
                <LeftSider pathname="user" />
                <div className="w-full p-4">
                    <Outlet />
                </div>
                <UserSider />
            </Layout>
        </main>
    );
};

const ProductRoute = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );
    return !isAuth ? (
        <Navigate to="/" />
    ) : (
        <main className="bg-bgColor">
            <Header />
            <Layout className="min-h-screen pt-12 flex justify-between w-full">
                <LeftSider pathname="product" />
                <div className="w-full p-4">
                    <Outlet />
                </div>
                <ProductSider />
            </Layout>
        </main>
    );
};

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="" element={<GuestRoute />}>
                <Route index path="" element={<Home />} />
                <Route index path="menu" element={<Menu />} />
                <Route index path="stores" element={<Stores />} />
                <Route index path="contact" element={<Contact />} />
            </Route>

            <Route path="auth" element={<AuthRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="register">
                    <Route
                        path="send-otp"
                        element={<SendOtpForRegisterEmail />}
                    />
                    <Route
                        path="verify-otp"
                        element={<VerifyOtpForRegisterEmail />}
                    />
                </Route>
                <Route path="forget-password">
                    <Route
                        path="send-otp"
                        element={<SendOtpForForgetPassword />}
                    />
                    <Route
                        path="verify-otp"
                        element={<VerifyOtpForForgetPassword />}
                    />
                </Route>
            </Route>

            <Route path="user" element={<UserRoute />}>
                <Route path="show/:userId" element={<ShowUser />} />
                <Route path="edit/:userId" element={<EditUser />} />
                <Route path="add" element={<AddUser />} />
                <Route path="all" element={<AllUsers />} />
            </Route>

            <Route path="product" element={<ProductRoute />}>
                <Route path="show/:productId" element={<ShowProduct />} />
                <Route path="edit/:productId" element={<EditProduct />} />
                <Route path="add" element={<AddProduct />} />
                <Route path="all" element={<AllProducts />} />
            </Route>

            <Route path="order" element={<OrderRoute />}>
                <Route path="show/:orderId" element={<ShowOrder />} />
                <Route path="edit/:orderId" element={<EditOrder />} />
                <Route path="add" element={<AddOrder />} />
                <Route path="all" element={<AllOrders />} />
            </Route>
        </Route>
    )
);

export default Router;
