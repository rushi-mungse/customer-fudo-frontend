import { Input, Space } from "antd";
const { Search } = Input;

interface PropsType {
    placeholder?: string;
    width?: number;
}

const SearchUi = ({
    placeholder = "Search Food Here",
    width = 200,
}: PropsType) => {
    const onSearch = (value: string) => console.log(value);
    return (
        <Space direction="vertical">
            <Search
                placeholder={placeholder}
                onSearch={onSearch}
                style={{ width }}
                allowClear
            />
        </Space>
    );
};

export default SearchUi;
