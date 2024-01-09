import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_5002,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export const addProduct = async (data: FormData) => {
    return await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL_5002}/product/create`,
        data,
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateProduct = async (data: FormData, productId: number) => {
    return await axios({
        method: "POST",
        url: `${
            import.meta.env.VITE_API_BASE_URL_5002
        }/product/update/${productId}`,
        data,
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getProducts = async () => api.get("/product");
export const deleteProduct = async (productId: number) =>
    api.delete(`/product/${productId}`);
export const getProduct = async (productId: number) =>
    api.get(`/product/${productId}`);
