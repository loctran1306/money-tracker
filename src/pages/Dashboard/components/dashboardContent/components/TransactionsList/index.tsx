import { Box, Spinner, Tag, Text } from "@chakra-ui/react";
import { ArrowCircleDown, ArrowCircleUp, Bank, Paperclip, PiggyBank } from "@phosphor-icons/react";
import { ListContainer, SpinnerContainer } from "./styles";
import { useEffect } from "react";
import { handleAmountIntToFloat } from "../../../../../../utils/fixAmountValue";
import { convertMonthPattern } from "../../../../../../utils/convertMonthPattern";
import { getAllTransactions } from "../../../../../../data/firebase";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../../store";
import { setTransactions, TransactionData } from "../../../../../../store/transactionSlice";

interface IconMap {
    [key: string]: React.ReactNode;
}

export const TransactionsList = () => {
    const hasAttachment = true;
    const userId = useSelector((state: RootState) => state.auth.userId);
    const transactions = useSelector((state: RootState) => state.transaction.transactions);
    const dispatch = useDispatch();

    const iconBasedOnType: IconMap = {
        Income: <ArrowCircleUp size={30} color="green" />,
        Expense: <ArrowCircleDown size={30} color="red" />,
        Savings: <PiggyBank size={30} color="green" />,
        Investments: <Bank size={30} color="green" />,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await getAllTransactions(userId)) as unknown as { [id: string]: any };
                if (data) {
                    const transactions = Object.keys(data).map((id) => ({
                        id,
                        ...data[id].newTransaction,
                    }));
                    dispatch(setTransactions(transactions));
                } else {
                    dispatch(setTransactions([]));
                }
            } catch (error) {
                console.error("An error has occurred:", error);
            }
        };
        fetchData();
    }, [userId, dispatch]);

    if (transactions.length === 0) {
        return <div>Aguardando dados...</div>;
    }

    return (
        <>
            {transactions ? (
                transactions.map((transaction, index) => (
                    <ListContainer key={`${transaction.description || index}`} className="transaction-item">
                        <Box marginLeft={14} minWidth={"32%"} display={"flex"} margin="10px">
                            {iconBasedOnType[transaction.transactionType]}
                            <Text fontSize={"lg"} fontWeight={"bold"} className="description">
                                {transaction.description}
                            </Text>
                        </Box>
                        <Box display={"flex"} minWidth={"15%"}>
                            <Text marginRight={2}>Date: </Text>
                            <Text className="description">{convertMonthPattern(transaction.date)}</Text>
                        </Box>
                        <Box className="item-box" minWidth={"20%"}>
                            <Text marginRight={2}>Category:</Text>
                            <Tag size={"md"} variant={"solid"} colorScheme="gray">
                                {transaction.category}
                            </Tag>
                        </Box>
                        <Box className="anex-box" minWidth={"15%"}>
                            {hasAttachment && <Paperclip size={25} color="#6B6B6B" cursor={"pointer"} />}
                            <Text marginLeft={10} fontSize={18}>
                                U$ {handleAmountIntToFloat(transaction.amount)}
                            </Text>
                        </Box>
                    </ListContainer>
                ))
            ) : (
                <SpinnerContainer>
                    <Spinner size={"xl"} />
                </SpinnerContainer>
            )}
        </>
    );
};

