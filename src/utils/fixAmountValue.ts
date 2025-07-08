export function handleAmountIntToFloat(amount: number | string | undefined | null) {
    // Kiểm tra amount có tồn tại và hợp lệ
    if (amount === undefined || amount === null || amount === "") {
        return "0.00";
    }

    let numAmount: number;

    if (typeof amount === "string") {
        numAmount = parseFloat(amount);
        // Kiểm tra parseFloat có thành công không
        if (isNaN(numAmount)) {
            return "0.00";
        }
    } else if (typeof amount === "number") {
        numAmount = amount;
        // Kiểm tra số có hợp lệ không
        if (isNaN(numAmount)) {
            return "0.00";
        }
    } else {
        return "0.00";
    }

    return numAmount.toFixed(2);
}

