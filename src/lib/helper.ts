import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export const predefinedTags = [
	{ id: '1', name: 'education', emoji: '📚' },
	{ id: '2', name: 'health', emoji: '💊' },
	{ id: '3', name: 'vacation', emoji: '🏖️' },
	{ id: '4', name: 'gift', emoji: '🎁' },
	{ id: '5', name: 'clothes', emoji: '👚' },
	{ id: '6', name: 'groceries', emoji: '🥦' },
	{ id: '7', name: 'rent', emoji: '🏠' }
];

export const getCurrDate = () => {
	return dayjs().format('dddd, MMM D');
};

const getTodayYesterday = () => {
	const todayStart = dayjs().startOf('day');
	const todayEnd = dayjs().endOf('day');

	const yesterdayStart = todayStart.subtract(1, 'day');
	const yesterdayEnd = todayEnd.subtract(1, 'day');

	return { todayStart, todayEnd, yesterdayStart, yesterdayEnd };
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

interface Expense {
	id: string;
	amount: number;
	tagName: string;
	tagEmoji: string;
	userId: string | null;
	createdAt: Date;
	updatedAt: Date;
}

const filterExpensesByDate = (
	expenses: Expense[],
	startDate: dayjs.Dayjs,
	endDate: dayjs.Dayjs
): Expense[] => {
	return expenses.filter((expense) => {
		const expenseDate = dayjs(expense.createdAt);
		return expenseDate.isBetween(startDate, endDate, null, '[]');
	});
};

const calculateTotalExpenses = (expenses: Expense[]): number => {
	return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const getTodayData = (userExpenses: Expense[]) => {
	if (!userExpenses || userExpenses.length <= 0) return { percentage: 0, todayTotal: 0 };
	const { todayStart, todayEnd, yesterdayStart, yesterdayEnd } = getTodayYesterday();
	const todayExpenses = filterExpensesByDate(userExpenses || [], todayStart, todayEnd);
	const yesterdayExpenses = filterExpensesByDate(userExpenses || [], yesterdayStart, yesterdayEnd);

	const todayTotal = calculateTotalExpenses(todayExpenses);
	const yesterdayTotal = calculateTotalExpenses(yesterdayExpenses);

	const percentage = calculatePercentageIncrease(todayTotal, yesterdayTotal);

	return { percentage, todayTotal };
};

export const generateExpenseArray = (currMonthDays: number, userExpenses: Expense[]) => {
	return Array.from({ length: currMonthDays }, (_, index) => {
		const currentDate = index + 1;
		const filteredExpenses = userExpenses
			? userExpenses.filter((expense) => {
					return dayjs(expense.createdAt).date() === currentDate;
				})
			: [];
		const totalExpense = calculateTotalExpenses(filteredExpenses);
		return { date: currentDate, expense: totalExpense };
	});
};
