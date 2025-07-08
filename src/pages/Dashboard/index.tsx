import { MainContainer } from "./styles";
import { SidebarComponent } from "./components/sidebar/SidebarComponent";
import { DashboardContentSection } from "./components/dashboardContent";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Route, Routes } from "react-router-dom";
import { Transactions } from "../Transactions";
import { Graphs } from "../Graphs";

export const DashboardPage = () => {
    const email = useSelector((state: RootState) => state.auth.email);
    return (
        <div>
            <MainContainer>
                <SidebarComponent email={email} user={{ email }} />
                <Routes>
                    <Route path="/dashboard" element={<DashboardContentSection />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="graph" element={<Graphs />} />
                </Routes>
                <Box className="fill" />
            </MainContainer>
        </div>
    );
};

