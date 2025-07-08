import { Box, Card, Input, InputGroup, InputLeftElement, Select, Text } from "@chakra-ui/react";
import { CustomButton } from "../../styles";
import { writeTransaction } from "../../../../data/firebase";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addTransaction } from "../../../../store/transactionSlice";
import { useState } from "react";

export const InsertTransactionSection = () => {
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("");

    const userId = useSelector((state: RootState) => state.auth.userId);
    const dispatch = useDispatch();

    const categories = [
        "Salary",
        "Food",
        "Transportation",
        "Health",
        "Education",
        "Entertainment",
        "Shopping",
        "Investment",
        "Savings",
        "Rent",
        "Others",
    ];

    function handleSetData(event: React.ChangeEvent<HTMLInputElement>) {
        setDate(event.target.value);
    }

    function handleSetCategory(event: React.ChangeEvent<HTMLSelectElement>) {
        setCategory(event.target.value);
    }

    function handleSetDescription(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }

    function handleSetAmount(event: React.ChangeEvent<HTMLInputElement>) {
        setAmount(Number(event.target.value));
    }

    function handleTransactionType(event: React.ChangeEvent<HTMLSelectElement>) {
        setTransactionType(event.target.value);
    }

    function handleSubmitTransaction(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const transactionId = Date.now().toString();

        // Thêm vào Redux store
        dispatch(
            addTransaction({
                id: transactionId,
                amount,
                category,
                date,
                description,
                transactionType,
            })
        );

        // Format cho Firebase
        const firebaseTransaction = {
            id: transactionId,
            transactionData: {
                amount,
                category,
                date,
                description,
                transactionType,
            },
        };

        writeTransaction(userId, firebaseTransaction);

        // Reset form
        setDate("");
        setCategory("");
        setDescription("");
        setAmount(0);
        setTransactionType("");
    }

    return (
        <Card marginTop={5} marginLeft={5} padding={5} border={"1px solid #e2e8f0"}>
            <Text fontSize={"xl"} fontWeight={"bold"} marginBottom={5}>
                Add Transaction
            </Text>
            <form onSubmit={handleSubmitTransaction}>
                <Box display={"flex"} flexWrap={"wrap"} gap={5}>
                    <Box>
                        <Text>Date</Text>
                        <Input
                            value={date}
                            onChange={handleSetData}
                            placeholder="Select Date and Time"
                            size="md"
                            type="date"
                        />
                    </Box>
                    <Box>
                        <Text>Category</Text>
                        <Select placeholder="Select option" value={category} onChange={handleSetCategory}>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <Text>Type</Text>
                        <Select placeholder="Select option" value={transactionType} onChange={handleTransactionType}>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                            <option value="Savings">Savings</option>
                            <option value="Investments">Investments</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text>Description</Text>
                        <Input
                            value={description}
                            onChange={handleSetDescription}
                            placeholder="Transaction description"
                            size="md"
                        />
                    </Box>
                    <Box>
                        <Text>Amount</Text>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
                                $
                            </InputLeftElement>
                            <Input value={amount} onChange={handleSetAmount} placeholder="Enter amount" type="number" />
                        </InputGroup>
                    </Box>
                </Box>
                <CustomButton type="submit" marginTop={5}>
                    Add Transaction
                </CustomButton>
            </form>
        </Card>
    );
};

