import React from "react";
import { Input, Space } from "antd";

const { Search } = Input;

const onSearch = (value: string, _e, info) => console.log(info?.source, value);

const InputWithSearch: React.FC = () => (
    <Space direction="vertical">
        <Search
            placeholder="Search Food Here..."
            onSearch={onSearch}
            style={{ width: 200 }}
            allowClear
        />
    </Space>
);

export default InputWithSearch;
