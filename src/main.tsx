import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClientProvider, QueryClient } from "react-query";
import { store } from "./state/store";
import router from "./router";
import "./index.css";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#f14646",
                },
            }}
        >
            <Provider store={store}>
                <QueryClientProvider client={new QueryClient()}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>
);
