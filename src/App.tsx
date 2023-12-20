import { RouterProvider } from "react-router-dom";
import useRefreshHook from "./hooks/useRefresh";
import { Loader } from "./components";
import router from "./router";

const App = () => {
    const { isLoading } = useRefreshHook();
    return (
        <>
            {isLoading ? (
                <div className="h-screen w-screen flex-center">
                    <Loader size="large" />
                </div>
            ) : (
                <RouterProvider router={router} />
            )}
        </>
    );
};

export default App;
