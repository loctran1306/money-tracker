import {
    Box,
    Card,
    IconButton,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { PencilSimple, TrashSimple } from "@phosphor-icons/react";
import { handleAmountIntToFloat } from "../../../../utils/fixAmountValue";
import { convertMonthPattern } from "../../../../utils/convertMonthPattern";
import { FirebaseDataContext } from "../../../../context/firebaseDataContext";
import { getAllTransactions, removeTransaction } from "../../../../data/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { TransactionData } from "../../../../store/transactionSlice";

export const TransactionsTable = () => {
    const userId = useSelector((state: RootState) => state.auth.userId);

    const { setTransactionsArray } = useContext(FirebaseDataContext);
    const { setFirebaseData } = useContext(FirebaseDataContext);

    const [getTransactionsFromDb, setGetTransactionsFromDb] = useState<TransactionData[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await getAllTransactions(userId)) as unknown as { [id: string]: any };
                console.log("Raw Firebase data:", data);
                if (data) {
                    const transactions = Object.keys(data).map((id) => ({
                        id,
                        ...data[id].newTransaction,
                    }));
                    console.log("Processed transactions:", transactions);

                    setGetTransactionsFromDb(transactions);
                    setTransactionsArray(transactions);
                    setFirebaseData(transactions);
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("An error occurred while fetching the data", error);
            }
        };

        fetchData();
    }, [userId, setTransactionsArray, setFirebaseData]);

    console.log("getTransactionsFromDb", getTransactionsFromDb);

    async function deleteTransaction(transactionId: string) {
        await removeTransaction(userId, transactionId);
        setGetTransactionsFromDb(getTransactionsFromDb?.filter((transaction) => transaction.id !== transactionId));
    }

    return (
        <Card margin="10px" padding="10px">
            <Text fontSize="xl" fontWeight="bold" marginBottom="10px">
                Transactions History
            </Text>
            <TableContainer>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Type</Th>
                            <Th>Category</Th>
                            <Th>Description</Th>
                            <Th isNumeric>Amount</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {getTransactionsFromDb ? (
                            getTransactionsFromDb.map((transaction) => (
                                <Tr key={transaction.id}>
                                    <Td>{transaction.date ? convertMonthPattern(transaction.date) : "No Date"}</Td>
                                    <Td>
                                        <Tag
                                            size="sm"
                                            variant="solid"
                                            colorScheme={
                                                transaction.transactionType === "Income"
                                                    ? "green"
                                                    : transaction.transactionType === "Expense"
                                                    ? "red"
                                                    : "blue"
                                            }
                                        >
                                            {transaction.transactionType || "Unknown"}
                                        </Tag>
                                    </Td>
                                    <Td>
                                        <Tag size="sm" variant="solid" colorScheme="gray">
                                            {transaction.category || "No Category"}
                                        </Tag>
                                    </Td>
                                    <Td>{transaction.description || "No Description"}</Td>
                                    <Td isNumeric>U$ {handleAmountIntToFloat(transaction.amount)}</Td>
                                    <Td>
                                        <Box display="flex" gap="2">
                                            <IconButton
                                                aria-label="Edit transaction"
                                                icon={<PencilSimple size={16} />}
                                                size="sm"
                                                colorScheme="blue"
                                                variant="outline"
                                            />
                                            <IconButton
                                                aria-label="Delete transaction"
                                                icon={<TrashSimple size={16} />}
                                                size="sm"
                                                colorScheme="red"
                                                variant="outline"
                                                onClick={() => deleteTransaction(transaction.id)}
                                            />
                                        </Box>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={6} textAlign="center">
                                    <Spinner size="lg" />
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    );
};

