import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "../features/userDetailsSlice";

export const store = configureStore({

    reducer: {
        app: userDetailsSlice,
    },
})