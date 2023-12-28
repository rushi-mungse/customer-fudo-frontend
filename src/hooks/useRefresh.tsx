import { useQuery } from "react-query";
import { setAuth } from "../state/slices/auth";
import { useAppDispatch } from "./reduxHooks";
import { self } from "../services/api/api";

const useRefreshHook = () => {
    const dispatch = useAppDispatch();

    const { isLoading, isError } = useQuery({
        queryKey: ["selfData"],
        queryFn: self,
        onSuccess: async ({ data }) => {
            dispatch(setAuth(data.user));
        },
        retry: false,
    });

    return { isError, isLoading };
};

export default useRefreshHook;
