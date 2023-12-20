import { useQuery } from "react-query";
import { setAuth } from "../state/slices/auth";
import { useAppDispatch } from "./reduxHooks";
import { refresh } from "../services/api/client";

const useRefreshHook = () => {
    const dispatch = useAppDispatch();

    const { isLoading, isError } = useQuery({
        queryKey: ["userData"],
        queryFn: refresh,
        onSuccess: async ({ data }) => {
            dispatch(setAuth(data.user));
        },
        retry: false,
    });

    return { isError, isLoading };
};

export default useRefreshHook;
