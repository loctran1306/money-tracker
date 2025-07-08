import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { RootState } from "../store";

interface AuthProviderProps {
    children: React.ReactNode;
    LoadingComponent?: React.ComponentType;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, LoadingComponent = DefaultLoading }) => {
    useAuth(); // Khởi tạo logic xác thực

    const authLoading = useSelector((state: RootState) => state.auth.authLoading);

    if (authLoading) {
        return <LoadingComponent />;
    }

    return <>{children}</>;
};

const DefaultLoading: React.FC = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "18px",
        }}
    >
        Đang tải...
    </div>
);
