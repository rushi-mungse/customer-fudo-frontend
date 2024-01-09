import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/api/product";
import { AxiosError } from "axios";
import { ErrorType } from "../../types";
import { Image, Rate, Tag, message } from "antd";
import { Loader, ProductTable } from "../../components";
import { ButtonUi } from "../../ui";

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
                <div>
                    <ProductTable productData={[product]} />
                </div>

                <div className="mt-10">
                    <div className="grid grid-cols-2 bg-active-500 rounded-lg shadow-lg shadow-gray-500">
                        <div className="flex justify-center flex-col col-span-1 bg-pure rounded-lg">
                            <div className="flex-center flex-col p-5">
                                <div className="w-[350px] flex justify-center flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex">
                                            <div className="flex flex-col">
                                                <span className="text-md uppercase text-active font-medium tracking-wide">
                                                    {product.name}
                                                </span>
                                                <Rate
                                                    defaultValue={3}
                                                    className="text-xs"
                                                />
                                            </div>
                                            <h1 className="text-active font-bold px-1">
                                                Product Info
                                            </h1>{" "}
                                            <div>
                                                <Tag
                                                    color="success"
                                                    className="rounded-full ml-2 text-xs"
                                                >
                                                    {product.availability
                                                        ? "Available"
                                                        : "Unavailable"}
                                                </Tag>
                                            </div>
                                        </div>
                                        <div className="bg-active rounded-[50%] flex-center flex-col p-2">
                                            <span className="text-xs text-pure">
                                                {product.discount}%
                                            </span>
                                            <span className="text-[8px] text-pure">
                                                Off
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-dark text-sm italic my-10 text-center px-4 font-medium">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="font-light">
                                            <span>Category : </span>
                                            <span>{product.category}</span>
                                        </span>

                                        <span className="font-light">
                                            <span>Ingredients : </span>
                                            <span>{product.ingredients}</span>
                                        </span>
                                    </div>
                                    <div className="text-center mt-8">
                                        <span className="rounded-full px-4 py-1 bg-pure text-dark ring-1 ring-pure-600/60 shadow-xs shadow-gray-500">
                                            {product.size.toLowerCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-8 bg-neutral-400 h-full rounded-lg px-10">
                                <span className="px-4 py-2 bg-orange-300 rounded-full text-dark">
                                    $ {product.price}
                                </span>
                                <ButtonUi
                                    intent={"tertiary"}
                                    rounded={"full"}
                                    size={"sm"}
                                >
                                    Add
                                </ButtonUi>
                            </div>
                        </div>
                        <div className="flex-center col-span-1">
                            <Image
                                src={product.imageUrl}
                                preview={false}
                                height={400}
                            />
                        </div>
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
