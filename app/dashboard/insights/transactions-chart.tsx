"use client";

import { Expense } from "@/db/schema/expenses";
import { useMemo } from "react";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format, isSameDay } from "date-fns";

export default function TransactionsChart({
	data,
	interval,
	type,
}: {
	data: Array<Expense>;
	interval: Array<Date>;
	type: "in" | "out" | "total";
}) {
	const chartData = useMemo(
		() =>
			interval.map<{ day: string; amount: number }>((x) => ({
				day: format(x, "dd"),
				amount: data
					.filter(
						(trans) =>
							isSameDay(trans.date, x) &&
							(type === "total" || type === trans.type),
					)
					.reduce(
						(acc, trans) =>
							trans.type === "in" ? acc + trans.amount : acc - trans.amount,
						0,
					),
			})),
		[data, interval],
	);

	const chartConfig = {
		transactions: {
			label: "Transaction total",
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;

	return (
		<div className="-ml-3">
			<ChartContainer config={chartConfig}>
				<BarChart
					accessibilityLayer
					data={chartData}
					margin={{
						top: 20,
					}}
				>
					<CartesianGrid vertical={false} stroke="rgba(40,40,40, 0.2)" />
					<XAxis
						dataKey="day"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<YAxis
						dataKey="amount"
						type="number"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
					/>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Bar dataKey="amount" fill="hsl(240 6 26)" radius={8}></Bar>
				</BarChart>
			</ChartContainer>
		</div>
	);
}
