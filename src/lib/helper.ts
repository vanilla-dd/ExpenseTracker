export const predefinedTags = [
	{ id: '1', name: 'education', emoji: '📚' },
	{ id: '2', name: 'health', emoji: '💊' },
	{ id: '3', name: 'vacation', emoji: '🏖️' },
	{ id: '4', name: 'gift', emoji: '🎁' },
	{ id: '5', name: 'clothes', emoji: '👚' },
	{ id: '6', name: 'groceries', emoji: '🥦' },
	{ id: '7', name: 'rent', emoji: '🏠' }
];
export const getTodayYesterday = () => {
	const todayStart = new Date();
	todayStart.setHours(0, 0, 0, 0); // Set time to beginning of the day
	const todayEnd = new Date();
	todayEnd.setHours(23, 59, 59, 999); // Set time to end of the day

	const yesterdayStart = new Date(todayStart);
	yesterdayStart.setDate(todayStart.getDate() - 1); // Set date to yesterday
	const yesterdayEnd = new Date(todayEnd);
	yesterdayEnd.setDate(todayEnd.getDate() - 1); // Set date to yesterday

	return { todayStart, todayEnd, yesterdayStart, yesterdayEnd };
};

interface Expense {
	id: string;
	amount: number;
	tagName: string;
	tagEmoji: string;
	userId: string | null;
	createdAt: Date;
	updatedAt: Date;
}

const filterExpensesByDate = (expenses: Expense[], startDate: Date, endDate: Date): Expense[] => {
	return expenses.filter((expense) => {
		const expenseDate = new Date(expense.createdAt);
		return expenseDate >= startDate && expenseDate <= endDate;
	});
};

const calculatePercentageIncrease = (todayTotal: number, yesterdayTotal: number): number => {
	if (todayTotal === 0 && yesterdayTotal === 0) {
		return 0;
	}
	if (yesterdayTotal === 0) {
		return todayTotal * 100;
	}
	return ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100;
};

const calculateTotalExpenses = (expenses: Expense[]): number => {
	return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const getTodayData = (
	userExpenses: Expense[],
	todayStart: Date,
	todayEnd: Date,
	yesterdayStart: Date,
	yesterdayEnd: Date
) => {
	if (!userExpenses || userExpenses.length <= 0) return { percentage: 0, todayTotal: 0 };
	const todayExpenses = filterExpensesByDate(userExpenses || [], todayStart, todayEnd);
	const yesterdayExpenses = filterExpensesByDate(userExpenses || [], yesterdayStart, yesterdayEnd);

	const todayTotal = calculateTotalExpenses(todayExpenses);
	const yesterdayTotal = calculateTotalExpenses(yesterdayExpenses);

	const percentage = calculatePercentageIncrease(todayTotal, yesterdayTotal);

	return { percentage, todayTotal };
};
