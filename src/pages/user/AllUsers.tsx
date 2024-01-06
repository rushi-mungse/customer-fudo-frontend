import { Avatar, Space, Table, Tag, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useMutation, useQuery } from "react-query";
import { deleteUser, getAllUser } from "../../services/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { AxiosError } from "axios";
import { ErrorType } from "../../types";

interface DataType {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    avatar: string;
}

const AllUsers: React.FC = () => {
    const [userData, setUserData] = useState<DataType[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const { refetch, isLoading } = useQuery({
        queryKey: ["AllUsers"],
        queryFn: async () => getAllUser(),
        onSuccess: async ({ data }: { data: { users: DataType[] } }) => {
            setUserData(data.users);
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
        onError: async (err: AxiosError) => {
            const error = err.response?.data as ErrorType;
            messageApi.open({
                type: "error",
                content: error?.error[0].msg,
                duration: 3,
            });
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
                pagination={{ position: ["bottomRight"] }}
                dataSource={userData}
                loading={isLoading}
                rowKey="id"
            />
        </>
    );
};

export default AllUsers;
