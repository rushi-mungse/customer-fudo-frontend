import React from "react";
import { Spin } from "antd";
type IPropType = {
    tip?: string;
    size?: "small" | "default" | "large" | undefined;
} & React.HTMLAttributes<HTMLElement>;

const Loader = ({
    tip = "",
    size = "small",
    children,
    ...props
}: IPropType) => {
    return (
        <Spin tip={tip} size={size} {...props}>
            {children}
        </Spin>
    );
};

export default Loader;
