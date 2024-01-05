import { Form, Input } from "antd";
import { IconType } from "react-icons";

interface InputType {
    fieldText: string;
    Icon: IconType;
    fieldName: string;
    message: string;
    textarea?: boolean;
    type?: string;
}
type PropsType = InputType & React.HtmlHTMLAttributes<HTMLDivElement>;

const InputUi = ({
    fieldName,
    Icon,
    fieldText,
    message,
    textarea = false,
    type = "text",
}: PropsType) => {
    return (
        <div className="w-full">
            <span className="text-dark font-medium tracking-wide rounded-md mb-1 inline-block">
                {fieldText}
            </span>
            <Form.Item
                rules={[{ required: true, message }]}
                style={{ width: "100%" }}
                name={fieldName}
            >
                {!textarea ? (
                    <Input
                        type={type}
                        placeholder={message}
                        prefix={<Icon className="text-active pr-2 text-xl" />}
                        className="font-light text-pure-800"
                    />
                ) : (
                    <Input.TextArea
                        placeholder={message}
                        className="font-light text-pure-800"
                    />
                )}
            </Form.Item>
        </div>
    );
};

export default InputUi;
