import { Avatar, Space, Table, Tag, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { SelectWithTagUi } from "../../ui";
import { useMutation, useQuery } from "react-query";
import { deleteUser, getAllUser } from "../../services/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
} from "@ant-design/icons";

interface DataType {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    avatar: string;
}

const AllUserList: React.FC = () => {
    const [userData, setUserData] = useState<DataType[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const { refetch, isLoading } = useQuery({
        queryKey: ["AllUsers"],
        queryFn: async () => getAllUser(),
        onSuccess: async ({ data }: { data: { users: DataType[] } }) => {
            setUserData(data.users);
        },
        onError: async () => {},
    });

    const { mutate } = useMutation({
        mutationKey: ["DeleteUser"],
        mutationFn: async ({ userId }: { userId: number }) =>
            deleteUser(userId),
        onSuccess: async ({ data }) => {
            messageApi.open({
                type: "success",
                content: `User ${data.id} deleted successfully.`,
                duration: 3,
            });
            refetch();
        },
        onError: async (err) => {
            console.log(err);
        },
    });

    const columns: ColumnsType<DataType> = [
        {
            title: "Profile Picture",
            dataIndex: "avatar",
            key: "avatar",
            render: (text) => (
                <Avatar
                    src={text}
                    alt="food-image"
                    size={"large"}
                    icon={<UserOutlined />}
                />
            ),
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
            render: (text, recorer) => (
                <Link to={`/user/show/${recorer.id}`}>{text}</Link>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role) => {
                const color = role === "admin" ? "purple" : "red";
                return (
                    <Tag
                        color={color}
                        key="avail"
                        className="rounded-full px-2"
                    >
                        {role}
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
                            onClick={() => navigate(`/user/edit/${recoder.id}`)}
                            className="text-success-800 rounded-md h-6 w-6 bg-pure-100/50 hover:bg-pure-100 transition-all "
                        >
                            <EditOutlined />
                        </button>
                        <button
                            onClick={() => mutate({ userId: recoder.id })}
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
        <div>
            {contextHolder}
            <div className="mb-4 flex items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 bg-pure">
                <div className="flex-center gap-4">
                    <span className="text-active font-bold">Products</span>
                    <div className="ring-1 ring-pure-600/60 w-[300px] rounded-md px-3 flex items-center justify-between py-1">
                        <input
                            type="text"
                            placeholder="Search Product"
                            className="w-full outline-none text-sm"
                        />
                        <SearchOutlined />
                    </div>
                </div>
                <div className="flex-center gap-4">
                    <div className="w-[200px]">
                        <SelectWithTagUi />
                    </div>
                    <div className="w-[200px]">
                        <SelectWithTagUi />
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                pagination={{ position: ["bottomRight"] }}
                dataSource={userData}
                loading={isLoading}
                rowKey="id"
            />
        </div>
    );
};

export default AllUserList;
