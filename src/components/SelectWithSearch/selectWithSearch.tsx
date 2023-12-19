import React from "react";
import { Select } from "antd";
import { useQuery } from "react-query";
import { getTenants } from "../../services/api/api";
import { Loader } from "../";

const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (
    input: string,
    option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const SelectWithSerch: React.FC = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["tenantData"],
        queryFn: async () => await getTenants(),
        staleTime: 10000,
    });

    if (isLoading) return <Loader tip="" size="small" className="text-sm" />;
    return (
        <Select
            showSearch
            bordered={false}
            placeholder="Select a Resto"
            optionFilterProp="children"
            style={{ width: "100%" }}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
                {
                    value: "jack",
                    label: "ack and me",
                },
            ]}
        />
    );
};

export default SelectWithSerch;
