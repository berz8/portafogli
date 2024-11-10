import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionsChart from "./transactions-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getExpenses } from "@/app/actions/expenses";
import { eachDayOfInterval, endOfMonth, startOfMonth } from "date-fns";
import { TrendingDown, TrendingUp } from "lucide-react";
import { getFormattedNumber } from "@/lib/utils";

export default async function Insights({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const currentDate = new Date();
	const year = parseInt(
		searchParams?.["year"]?.toString() ?? currentDate.getFullYear().toString(),
	);
	const month = parseInt(
		searchParams?.["month"]?.toString() ??
			(currentDate.getMonth() + 1).toString(),
	);

	const startDate = new Date(year, month - 1, 1); // month is 0-indexed in Date constructor
	const endDate = new Date(year, month, 0); // Last day of the month

	const transactions = await getExpenses(
		startOfMonth(new Date(startDate.toUTCString())),
		endOfMonth(new Date(endDate.toUTCString())),
		searchParams?.["sort"]?.toString().split("-") ?? ["date", "desc"],
	);

	const total = () => {
		let income = 0;
		let expenses = 0;
		transactions.forEach((x) => {
			if (x.type == "in") {
				income += x.amount;
			} else {
				expenses += x.amount;
			}
		});
		return { income, expenses };
	};

	return (
		<div>
			<Card className="bg-transparent border-none shadow-none">
				<CardHeader>
					<CardTitle className="text-center">Insights</CardTitle>
				</CardHeader>
			</Card>
			<Tabs defaultValue="income" className="w-full">
				<TabsList className="w-full grid grid-cols-3 h-auto rounded-2xl">
					<TabsTrigger
						value="income"
						className="flex items-center justify-start gap-3 rounded-xl"
					>
						<TrendingUp className="w-6 h-6 bg-green-100 p-1 rounded-lg" />
						<div className="flex flex-col items-start">
							<span className="opacity-75 text-sm">Income</span>
							<span className="-mt-1 text-base font-bold">
								{getFormattedNumber(total().income).replace(".00", "")}
							</span>
						</div>
					</TabsTrigger>
					<TabsTrigger
						value="expenses"
						className="flex items-center justify-start gap-3 rounded-xl"
					>
						<TrendingDown className="w-6 h-6 bg-red-100 p-1 rounded-lg" />
						<div className="flex flex-col items-start">
							<span className="opacity-75 text-sm">Expenses</span>
							<span className="-mt-1 text-base font-bold">
								{getFormattedNumber(total().expenses).replace(".00", "")}
							</span>
						</div>
					</TabsTrigger>
					<TabsTrigger
						value="total"
						className="flex items-center justify-start gap-3 rounded-xl"
					>
						<TrendingDown className="w-6 h-6 bg-gray-100 p-1 rounded-lg" />
						<div className="flex flex-col items-start">
							<span className="opacity-75 text-sm">Total</span>
							<span className="-mt-1 text-base font-bold">
								{getFormattedNumber(total().income - total().expenses).replace(
									".00",
									"",
								)}
							</span>
						</div>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="income">
					<TransactionsChart
						data={transactions}
						interval={
							eachDayOfInterval({ start: startDate, end: endDate }) || []
						}
						type="in"
					/>
				</TabsContent>
				<TabsContent value="expenses">
					<TransactionsChart
						data={transactions}
						interval={
							eachDayOfInterval({ start: startDate, end: endDate }) || []
						}
						type="out"
					/>
				</TabsContent>
				<TabsContent value="total">
					<TransactionsChart
						data={transactions}
						interval={
							eachDayOfInterval({ start: startDate, end: endDate }) || []
						}
						type="total"
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
