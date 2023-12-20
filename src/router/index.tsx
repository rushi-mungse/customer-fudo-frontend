import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
} from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import Layout from "../Layout";
import {
    ForgetPassword,
    HomePage,
    Login,
    OtpVerification,
    ResetPassword,
    SignUp,
    UserDashBoard,
} from "../pages";
import { RootState } from "../state/store";

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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index path="" element={<HomePage />} />
            <Route path="auth" element={<GuestRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="otp-verification" element={<OtpVerification />} />
                <Route path="forget-password" element={<ForgetPassword />} />
                <Route path="set-password" element={<ResetPassword />} />
            </Route>
            <Route path="user" element={<ProtectedRoute />}>
                <Route path="" element={<UserDashBoard />} />
            </Route>
        </Route>
    )
);

export default router;
