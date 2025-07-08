import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TransactionData {
    id: string;
    amount: number;
    category: string;
    date: string;
    description: string;
    transactionType: string;
}

interface TransactionState {
    transactions: TransactionData[];
}

const initialState: TransactionState = {
    transactions: [],
};

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setTransactions: (state, action: PayloadAction<TransactionData[]>) => {
            state.transactions = action.payload;
        },
        addTransaction: (state, action: PayloadAction<TransactionData>) => {
            state.transactions.push(action.payload);
        },
        removeTransaction: (state, action: PayloadAction<string>) => {
            state.transactions = state.transactions.filter((t) => t.id !== action.payload);
        },
        clearTransactions: (state) => {
            state.transactions = [];
        },
    },
});

export const { setTransactions, addTransaction, removeTransaction, clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
