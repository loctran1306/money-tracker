import { useSelector } from "react-redux";
import { DashboardPage } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./components/AuthProvider";
import { RootState } from "./store";

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

const AppContent = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return <>{isAuthenticated ? <DashboardPage /> : <LoginPage />}</>;
};

export default App;

