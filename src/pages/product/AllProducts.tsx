import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
} from "@ant-design/icons";

interface DataType {
    key: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    availability: boolean;
    size: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "image",
        dataIndex: "image",
        key: "image",
        render: (text) => <img src={text} alt="food-image" className="h-20" />,
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
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
                <Tag color={color} key="avail" className="rounded-full px-2">
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
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") color = "volcano";
            return (
                <Tag color={color} key={tag} className="rounded-full px-2">
                    {tag.toUpperCase()}
                </Tag>
            );
        },
    },
    {
        title: "Action",
        key: "action",
        render: (_, recoder) => {
            return (
                <Space size="middle">
                    <button
                        onClick={() => console.log(recoder)}
                        className="text-success-800 rounded-md h-6 w-6 bg-pure-100/50 hover:bg-pure-100 transition-all "
                    >
                        <EditOutlined />
                    </button>
                    <button
                        onClick={() => console.log(recoder)}
                        className="text-danger-800 rounded-md h-6 w-6 bg-pure-100/50 hover:bg-pure-100 transition-all "
                    >
                        <DeleteOutlined />
                    </button>
                </Space>
            );
        },
    },
];

const data: DataType[] = [
    {
        key: "1",
        name: "John Brown",
        price: 32,
        description: "New York No. 1 Lake Park",
        category: "pizza",
        image: "/food.png",
        availability: true,
        size: "Small",
    },
    {
        key: "2",
        name: "Jim Green",
        price: 42,
        description: "London No. 1 Lake Park",
        category: "loser",
        image: "/food.png",
        availability: false,
        size: "Large",
    },
    {
        key: "3",
        name: "Joe Black",
        price: 32,
        description: "Sydney No. 1 Lake Park",
        category: "cool",
        image: "/food.png",
        availability: true,
        size: "Medium",
    },
];

const AllProducts: React.FC = () => {
    return (
        <div>
            <div className="mb-4 flex items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 bg-pure">
                <span className="text-active font-bold">All Products</span>
                <div className="ring-1 ring-pure-600/60 w-[300px] rounded-md px-3 flex items-center justify-between py-1">
                    <input
                        type="text"
                        placeholder="Search Product"
                        className="w-full outline-none text-sm"
                    />
                    <SearchOutlined />
                </div>
            </div>
            <Table
                columns={columns}
                bordered
                pagination={{ position: ["bottomRight"] }}
                dataSource={data}
            />
        </div>
    );
};

export default AllProducts;
