import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { QueryClientProvider, QueryClient } from "react-query";
import { store } from "./state";
import App from "./App";
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
                    <App />
                </QueryClientProvider>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>
);
