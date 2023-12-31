import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";

export const useMessage = (
    type: NoticeType = "info",
    content: React.ReactNode = "Write something message",
    duration: number = 3
) => {
    const [messageApi, contextHolder] = message.useMessage();
    messageApi.open({
        type,
        content,
        duration,
    });
    return { contextHolder };
};

export default useMessage;
