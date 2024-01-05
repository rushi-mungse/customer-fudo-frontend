import { RootState } from "../state";
import { useAppSelector } from "../hooks/reduxHooks";
import Layout from "../Layout";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
} from "react-router-dom";
import {
    ForgetPassword,
    Home,
    Login,
    EmailVerification,
    ResetPassword,
    SendVerificationCode,
    UserDashBoard,
} from "../pages";

const GuestRoute = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );
    return isAuth ? <Navigate to="/" /> : <Outlet />;
};

const ProtectedRoute = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );
    return !isAuth ? <Navigate to="/" /> : <Outlet />;
};

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index path="" element={<Home />} />
            <Route path="auth" element={<GuestRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SendVerificationCode />} />
                <Route
                    path="otp-verification"
                    element={<EmailVerification />}
                />
                <Route path="forget-password" element={<ForgetPassword />} />
                <Route path="set-password" element={<ResetPassword />} />
            </Route>
            <Route path="user" element={<ProtectedRoute />}>
                <Route path="" element={<UserDashBoard />} />
            </Route>
        </Route>
    )
);

export default Router;
