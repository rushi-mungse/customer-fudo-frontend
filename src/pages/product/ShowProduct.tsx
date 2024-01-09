import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/api/product";
import { AxiosError } from "axios";
import { ErrorType } from "../../types";
import { Image, Rate, Tag, message } from "antd";
import { Loader } from "../../components";

interface ProductDataType {
    availability: boolean;
    category: string;
    createdAt: Date;
    currency: string;
    description: string;
    discount: number;
    id: number;
    imageUrl: string;
    ingredients: string;
    name: string;
    preparationTimeInMinute: number;
    price: number;
    size: string;
    updatedAt: Date;
}

const ShowProduct = () => {
    const { productId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();

    const { data } = useQuery({
        queryKey: ["product"],
        queryFn: async () => getProduct(Number(productId)),
        onError: async (err: AxiosError) => {
            const errors = err.response?.data as ErrorType;
            messageApi.open({
                type: "error",
                content: errors.error[0].msg,
                duration: 3,
            });
        },
    });

    if (data) {
        const product = data?.data.product as ProductDataType;
        return (
            <>
                {contextHolder}
                <div className="grid grid-cols-2">
                    <div className="flex justify-center flex-col col-span-1">
                        <div className="flex-center flex-col">
                            <div>
                                <div>
                                    <span className="text-lg uppercase text-active font-medium tracking-wider">
                                        {product.name}
                                    </span>
                                    <Tag
                                        color="red"
                                        className="rounded-full ml-2 text-xs"
                                    >
                                        {product.availability
                                            ? "Available"
                                            : "Unavailable"}
                                    </Tag>
                                </div>

                                <Rate defaultValue={3} className="text-sm" />

                                <p className="text-pure-500 text-sm italic mt-2">
                                    {product.description}
                                </p>

                                <div className="text-center">
                                    <Tag className="rounded-full ml-2 text-md">
                                        {product.size}
                                    </Tag>
                                </div>

                                <span>
                                    <span className="font-bold">
                                        Category :{" "}
                                    </span>
                                    <span className="text-">
                                        {product.category}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-center col-span-1">
                        <Image src={product.imageUrl} preview={false} />
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="flex-center h-full w-full">
            <Loader />
        </div>
    );
};

export default ShowProduct;
