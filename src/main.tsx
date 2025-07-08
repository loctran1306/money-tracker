import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalStyle, { COLORS } from "./styles/global.ts";
import { BrowserRouter } from "react-router-dom";
import { TransactionProvider } from "./context/transactionContext.tsx";
import { FirebaseDataProvider } from "./context/firebaseDataContext.tsx";
import { Provider } from "react-redux";
import store from "./store";

const theme = {
    colors: COLORS,
};

const RootComponent = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <FirebaseDataProvider>
                        <TransactionProvider>
                            <BrowserRouter>
                                <ChakraProvider>
                                    <App />
                                </ChakraProvider>
                            </BrowserRouter>
                        </TransactionProvider>
                    </FirebaseDataProvider>
                </ThemeProvider>
            </Provider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<RootComponent />);

