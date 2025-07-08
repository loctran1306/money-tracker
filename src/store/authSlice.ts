import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    userId: string;
    email: string;
    userName: string;
    isAuthenticated: boolean;
    authLoading: boolean;
}

const initialState: AuthState = {
    userId: "",
    email: "",
    userName: "",
    isAuthenticated: false,
    authLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<{ userId: string; email: string; userName: string }>) => {
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.userName = action.payload.userName;
            state.isAuthenticated = true;
            state.authLoading = false;
        },
        clearAuthUser: (state) => {
            state.userId = "";
            state.email = "";
            state.userName = "";
            state.isAuthenticated = false;
            state.authLoading = false;
        },
        setAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.authLoading = action.payload;
        },
    },
});

export const { setAuthUser, clearAuthUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;

