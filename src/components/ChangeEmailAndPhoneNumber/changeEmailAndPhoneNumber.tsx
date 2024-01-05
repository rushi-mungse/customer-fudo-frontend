import { useState } from "react";
import { Tabs, type TabsProps } from "antd";
import ChangeEmail from "./ChangeEmail/ChangeEmail";
import ChangePhoneNumber from "./ChangePhoneNumber/ChangePhoneNumber";

const items: TabsProps["items"] = [
    {
        key: "1",
        label: "Change Email",
        children: <ChangeEmail />,
    },
    {
        key: "2",
        label: "Change Phone Number",
        children: <ChangePhoneNumber />,
    },
];

const ChangeEmailAndPhoneNumber = () => {
    const [key, setKey] = useState("1");
    const onChange = (key: string) => setKey(key);
    return (
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md bg-pure p-6 h-full">
            <Tabs defaultActiveKey={key} items={items} onChange={onChange} />
        </div>
    );
};

export default ChangeEmailAndPhoneNumber;
