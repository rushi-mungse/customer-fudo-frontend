import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Layout from "../Layout";
import { HomePage, OtpVerification, SignUp } from "../pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="" element={<HomePage />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route
                path="/auth/otp-verification"
                element={<OtpVerification />}
            />
        </Route>
    )
);

export default router;
