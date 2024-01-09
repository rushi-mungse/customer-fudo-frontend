import { Avatar, Space, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMutation, useQuery } from "react-query";
import { deleteProduct, getProducts } from "../../services/api/product";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { AxiosError } from "axios";
import { ErrorType, ProductDataType } from "../../types";

const AllUsers: React.FC = () => {
    const [userData, setUserData] = useState<ProductDataType[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const { refetch, isLoading } = useQuery({
        queryKey: ["AllProduct"],
        queryFn: async () => getProducts(),
        onSuccess: async ({
            data,
        }: {
            data: { products: ProductDataType[] };
        }) => setUserData(data.products),
        onError: async (err: AxiosError) => {
            const error = err.response?.data as ErrorType;
            messageApi.open({
                type: "error",
                content: error?.error[0].msg,
                duration: 3,
            });
        },
    });

    const { mutate } = useMutation({
        mutationKey: ["DeleteProduct"],
        mutationFn: async ({ productId }: { productId: number }) =>
            deleteProduct(productId),
        onSuccess: async ({ data }) => {
            messageApi.open({
                type: "success",
                content: `Product ${data.productId} deleted successfully.`,
                duration: 3,
            });
            refetch();
        },
        onError: async (err: AxiosError) => {
            const error = err.response?.data as ErrorType;
            messageApi.open({
                type: "error",
                content: error?.error[0].msg,
                duration: 3,
            });
        },
    });

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
        {
            title: "Action",
            key: "action",
            render: (_, recoder) => {
                return (
                    <Space size="middle">
                        <button
                            onClick={() =>
                                navigate(`/product/edit/${recoder.id}`)
                            }
                            className="text-success-800 rounded-md h-6 w-6 bg-pure-100/50 hover:bg-pure-100 transition-all "
                        >
                            <EditOutlined />
                        </button>
                        <button
                            onClick={() => mutate({ productId: recoder.id })}
                            className="text-danger-800 rounded-md h-6 w-6 bg-pure-100/50 hover:bg-pure-100 transition-all "
                        >
                            <DeleteOutlined />
                        </button>
                    </Space>
                );
            },
        },
    ];

    return (
        <>
            {contextHolder}
            <div className="mb-4 flex items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 bg-pure">
                <span className="text-active font-bold">All Users</span>

                <div className="ring-1 ring-pure-600/60 w-[300px] rounded-full px-4 flex items-center justify-between py-1">
                    <input
                        type="text"
                        placeholder="Search Users"
                        className="w-full outline-none text-sm tracking-wide font-light"
                    />
                    <SearchOutlined />
                </div>
            </div>
            <Table
                columns={columns}
                bordered
                pagination={{ position: ["bottomRight"], defaultPageSize: 7 }}
                dataSource={userData}
                loading={isLoading}
                rowKey="id"
            />
        </>
    );
};

export default AllUsers;
