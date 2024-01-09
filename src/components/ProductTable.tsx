import { Avatar, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { ProductDataType } from "../types";

const ProductTable = ({ productData }: { productData: ProductDataType[] }) => {
    const columns: ColumnsType<ProductDataType> = [
        {
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (text) => {
                return (
                    <Avatar
                        src={text}
                        alt="food-image"
                        size={"large"}
                        icon={<UserOutlined />}
                    />
                );
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, recorder) => (
                <Link to={`/product/show/${recorder.id}`}>{text}</Link>
            ),
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Availability",
            dataIndex: "availability",
            key: "availability",
            render: (avail) => {
                const color = avail ? "green" : "volcano";
                return (
                    <Tag
                        color={color}
                        key="avail"
                        className="rounded-full px-2"
                    >
                        {avail ? "Available" : "Unavailable"}
                    </Tag>
                );
            },
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Category",
            key: "category",
            dataIndex: "category",
            render: (tag: string) => {
                let color = tag?.length > 5 ? "geekblue" : "green";
                if (tag === "loser") color = "volcano";
                return (
                    <Tag color={color} key={tag} className="rounded-full px-2">
                        {tag?.toLocaleLowerCase()}
                    </Tag>
                );
            },
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                bordered
                dataSource={productData}
                rowKey="id"
                pagination={false}
            />
        </>
    );
};

export default ProductTable;
