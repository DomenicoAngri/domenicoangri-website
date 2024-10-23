import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Default language.
    currentLanguage: "en",
};

const languageReducer = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.currentLanguage = action.payload;
        },
    },
});

export const { setLanguage } = languageReducer.actions;

export default languageReducer.reducer;
