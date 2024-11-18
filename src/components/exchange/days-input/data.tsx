// Random amount between $35.00 and $60.00 w/ random cents
const generateRandomAmount = () => {
    const dollars = Math.floor(Math.random() * (60 - 35 + 1)) + 35;
    const cents = Math.floor(Math.random() * 100);
    return Number(`${dollars}.${cents.toString().padStart(2, "0")}`);
};

const generateDates = () => {
    const data: Record<string, number> = {};

    // Generate for remaining November days
    for (let day = 16; day <= 30; day++) {
        const date = `2024-11-${day.toString().padStart(2, "0")}`;
        data[date] = generateRandomAmount();
    }

    // Generate for December (all days)
    for (let day = 1; day <= 31; day++) {
        const date = `2024-12-${day.toString().padStart(2, "0")}`;
        data[date] = generateRandomAmount();
    }

    return data;
};

const dayAmountsData = generateDates();

export default dayAmountsData;
