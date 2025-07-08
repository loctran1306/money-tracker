export function convertMonthPattern(date: string) {
    // Kiểm tra date có tồn tại và đúng format
    if (!date || typeof date !== "string" || !date.includes("-")) {
        return "Invalid Date";
    }

    const dateArray = date.split("-");

    // Kiểm tra format YYYY-MM-DD
    if (dateArray.length !== 3) {
        return "Invalid Date";
    }

    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthIndex = parseInt(month) - 1;

    // Kiểm tra tháng hợp lệ
    if (monthIndex < 0 || monthIndex > 11 || isNaN(monthIndex)) {
        return "Invalid Date";
    }

    const monthName = monthArray[monthIndex];
    return `${day} ${monthName} ${year}`;
}

