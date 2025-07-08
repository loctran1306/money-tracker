import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../store/authSlice";
import { AuthService } from "../../services/authService";

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await AuthService.loginWithGoogle();

            if (result.success && result.user) {
                dispatch(
                    setAuthUser({
                        userId: result.user.uid,
                        email: result.user.email ?? "",
                        userName: result.user.displayName ?? "",
                    })
                );
                navigate("/dashboard");
            } else {
                setError("Đăng nhập thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                gap: "20px",
            }}
        >
            <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Money Tracker</h1>

            {error && (
                <div
                    style={{
                        color: "red",
                        padding: "10px",
                        border: "1px solid red",
                        borderRadius: "4px",
                        backgroundColor: "#ffebee",
                    }}
                >
                    {error}
                </div>
            )}

            <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                style={{
                    padding: "12px 24px",
                    background: isLoading ? "#ccc" : "#4285F4",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    fontWeight: "500",
                    minWidth: "200px",
                }}
            >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập với Google"}
            </button>
        </div>
    );
};

