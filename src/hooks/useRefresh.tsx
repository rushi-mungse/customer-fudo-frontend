import axios from "axios";
import { useEffect, useState } from "react";
import { setAuth } from "../state/slices/auth";
import { useAppDispatch } from "./reduxHooks";

const useRefreshHook = () => {
    const [loading, setLoading] = useState(true);
    const [unMounted, setUnMounted] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
                    {
                        withCredentials: true,
                    }
                );
                if (!unMounted) {
                    setLoading(false);
                    dispatch(setAuth(data.user));
                    setUnMounted(true);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { loading };
};

export default useRefreshHook;
