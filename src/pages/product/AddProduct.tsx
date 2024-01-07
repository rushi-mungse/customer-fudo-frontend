import {
    Button,
    Form,
    InputNumber,
    Radio,
    Select,
    Switch,
    Upload,
    message,
    RadioChangeEvent,
} from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { InputUi, ButtonUi } from "../../ui";
import { IoIosTime } from "react-icons/io";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { ImPriceTag } from "react-icons/im";
import {
    MdPhotoSizeSelectActual,
    MdPublish,
    MdDriveFileRenameOutline,
} from "react-icons/md";
import { ErrorType, ProductDataType } from "../../types";
import { addProduct } from "../../services/api/client";
import { RcFile } from "antd/es/upload";

const AddProduct = () => {
    const [image, setImage] = useState<RcFile | null>(null);
    const [form] = Form.useForm();
    const [availability, setAvailability] = useState<boolean>(true);
    const [size, setSize] = useState<SizeType>("middle");
    const [messageApi, contextHolder] = message.useMessage();
    const [base64, setBase64] = useState<string | ArrayBuffer | null>(
        "/food.png"
    );

    const { mutate } = useMutation({
        mutationKey: ["updateFullName"],
        mutationFn: async (data: FormData) => addProduct(data),
        onSuccess: async ({ data }) => {
            console.log(data);
            messageApi.open({
                type: "success",
                content: "Product published successfully!",
                duration: 3,
            });
            setImage(null);
            setBase64("/food.png");
            form.resetFields();
        },
        onError: async (err: AxiosError) => {
            const errors = err.response?.data as unknown as ErrorType;
            messageApi.open({
                type: "error",
                content: <span>{errors.error[0].msg}</span>,
                duration: 3,
            });
        },
    });

    const handleSizeChange = (e: RadioChangeEvent) => {
        setSize(e.target.value);
    };

    return (
        <div className="mt-4">
            {contextHolder}
            <Form
                form={form}
                onFinish={(values: ProductDataType) => {
                    if (!image) {
                        messageApi.open({
                            type: "error",
                            content: "Please upload product image!",
                            duration: 3,
                        });
                        return;
                    }

                    const formData = new FormData();
                    formData.append("image", image);
                    formData.append("name", values.name);
                    formData.append("description", values.description);
                    formData.append("discount", String(values.discount));
                    formData.append("price", String(values.price));
                    formData.append("availability", String(availability));
                    formData.append("size", values.size);
                    formData.append(
                        "preparationTimeInMinute",
                        String(values.preparationTimeInMinute)
                    );
                    formData.append("currency", values.currency);
                    formData.append("category", values.category);
                    formData.append("ingredients", values.ingredients);

                    mutate(formData);
                }}
                className="grid grid-cols-5 gap-8"
            >
                <div className="gap-4 flex flex-col col-span-2">
                    <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3 rounded-md bg-pure">
                        <InputUi
                            fieldName="name"
                            fieldText="Product Name"
                            Icon={MdDriveFileRenameOutline}
                            message="Enter product name"
                        />

                        <InputUi
                            fieldName="description"
                            fieldText="Product Description"
                            Icon={MdDriveFileRenameOutline}
                            message="Enter product description"
                            textarea
                        />
                    </div>

                    <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 rounded-md bg-pure">
                        <span className="text-active font-medium tracking-wide px-3 py-1 rounded-md mb-4 inline-block">
                            Upload Product Image
                        </span>
                        <div className="flex items-center justify-center gap-3 flex-col">
                            <div className="p-3 bg-active rounded-md">
                                <img
                                    src={base64?.toString()}
                                    alt="food image"
                                    className="h-[300px]"
                                />
                            </div>
                            <Upload
                                name="image"
                                maxCount={1}
                                listType="picture"
                                beforeUpload={(file) => {
                                    setImage(file);
                                    const reader = new FileReader();
                                    reader.onload = () =>
                                        setBase64(reader.result);
                                    reader.readAsDataURL(file);
                                    return false;
                                }}
                                showUploadList={false}
                                className="flex justify-end w-full"
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload Product Image
                                </Button>
                            </Upload>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3 rounded-md bg-pure flex flex-col gap-2">
                    <div className="w-full">
                        <span className="text-dark font-medium tracking-wide rounded-md mb-1 inline-block">
                            Product Discount
                        </span>
                        <Form.Item
                            className="w-full"
                            name="discount"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter product discount",
                                },
                                { type: "number", min: 0 },
                            ]}
                        >
                            <InputNumber
                                placeholder="0"
                                prefix={
                                    <TbDiscountCheckFilled className="pr-2 text-orange-600 font-bold text-2xl" />
                                }
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </div>

                    <div className="w-full">
                        <span className="text-dark font-medium tracking-wide rounded-md mb-1 inline-block">
                            Product Preparation Time(Minute)
                        </span>
                        <Form.Item
                            className="w-full"
                            name="preparationTimeInMinute"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter product preparation time",
                                },
                                { type: "number", min: 0 },
                            ]}
                        >
                            <InputNumber
                                placeholder="0"
                                prefix={
                                    <IoIosTime className="pr-2 text-active font-bold text-2xl" />
                                }
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </div>

                    <div className="w-full">
                        <span className="text-dark font-medium tracking-wide rounded-md mb-1 inline-block">
                            Price Currency
                        </span>
                        <Form.Item
                            className="w-full"
                            name="currency"
                            rules={[
                                {
                                    required: true,
                                    message: "Select price currency",
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    { value: "ind", label: "Ind" },
                                    { value: "us", label: "Dol" },
                                    { value: "jpn", label: "Uno" },
                                ]}
                            />
                        </Form.Item>
                    </div>

                    <div className="w-full">
                        <span className="text-dark font-medium tracking-wide rounded-md mb-1 inline-block">
                            Product Category
                        </span>
                        <Form.Item
                            className="w-full"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: "Select product category",
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    { value: "pizza", label: "Pizza" },
                                    { value: "spicy", label: "Spicy" },
                                    {
                                        value: "sweet",
                                        label: "sweet",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </div>

                    <InputUi
                        fieldName="size"
                        fieldText="Product size"
                        Icon={MdPhotoSizeSelectActual}
                        message="Enter product size"
                    />

                    <div className="w-full">
                        <span className="text-dark font-medium tracking-wide rounded-md mb-1 inline-block">
                            Product Price
                        </span>
                        <Form.Item
                            className="w-full"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter product price",
                                },
                                { type: "number", min: 0 },
                            ]}
                        >
                            <InputNumber
                                placeholder="0"
                                prefix={
                                    <ImPriceTag className="pr-2 text-active font-bold text-xl" />
                                }
                                style={{ width: "100%" }}
                                addonAfter={"$"}
                            />
                        </Form.Item>
                    </div>

                    <InputUi
                        fieldName="ingredients"
                        fieldText="Product Ingredients"
                        Icon={MdPhotoSizeSelectActual}
                        message="Enter ingredients"
                    />
                </div>

                <div className="flex flex-col">
                    <div className="mb-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3 rounded-md bg-pure">
                        <span className="text-dark font-medium tracking-wide rounded-md mb-3 inline-block">
                            🌶️ Spiciness
                        </span>
                        <Radio.Group
                            value={size}
                            onChange={handleSizeChange}
                            size="small"
                        >
                            <Radio.Button value="less">Less</Radio.Button>
                            <Radio.Button value="medium">Medium</Radio.Button>
                            <Radio.Button value="hot">Hot</Radio.Button>
                        </Radio.Group>
                    </div>

                    <div className="mb-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3 rounded-md bg-pure flex gap-4 flex-col">
                        <span className="text-dark font-medium tracking-wide rounded-md mb-3 inline-block">
                            🔥 Other Properties
                        </span>
                        <div className="flex items-center justify-between">
                            <span className="text-dark font-medium tracking-wide rounded-md mb-1 inline-block">
                                Hit Product
                            </span>
                            <Switch
                                size="small"
                                defaultChecked={availability}
                                onChange={(value) => {
                                    setAvailability(value);
                                }}
                                className="ring-1 ring-active-300"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-dark font-medium tracking-wide rounded-md mb-1 inline-block">
                                Publish
                            </span>
                            <Switch
                                size="small"
                                defaultChecked={availability}
                                onChange={(value) => {
                                    setAvailability(value);
                                }}
                                className="ring-1 ring-active-300"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-dark font-medium tracking-wide rounded-md mb-1 inline-block">
                                Availability
                            </span>
                            <Switch
                                size="small"
                                defaultChecked={availability}
                                onChange={(value) => {
                                    setAvailability(value);
                                }}
                                className="ring-1 ring-active-300"
                            />
                        </div>
                    </div>

                    <ButtonUi
                        className="w-full flex items-center justify-center"
                        intent={"tertiary"}
                        size={"sm"}
                        rounded={"medium"}
                        leadingIcon={MdPublish}
                        type="submit"
                    >
                        Publish Product
                    </ButtonUi>
                </div>
            </Form>
        </div>
    );
};

export default AddProduct;
