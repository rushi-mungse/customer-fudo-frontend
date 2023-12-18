import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOtpData } from "../../types";

interface IInitialState {
    otpInfo: IOtpData | null;
}
const initialState: IInitialState = {
    otpInfo: null,
};

export const otpInfoSlice = createSlice({
    name: "otpInfo",
    initialState,
    reducers: {
        setOtpInfo: (state, action: PayloadAction<IOtpData>) => {
            const data = action.payload;
            state.otpInfo = data;
        },
    },
});

export const { setOtpInfo } = otpInfoSlice.actions;
export default otpInfoSlice.reducer;
