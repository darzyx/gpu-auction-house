"use client";

import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
    { day: "Sunday", high: 46.2, average: 31.68, low: 20.88 },
    { day: "Monday", high: 31.92, average: 18.24, low: 7.68 },
    { day: "Tuesday", high: 48.96, average: 34.08, low: 19.68 },
    { day: "Wednesday", high: 47.28, average: 29.28, low: 12.48 },
    { day: "Thursday", high: 49.2, average: 36.48, low: 24.48 },
    { day: "Friday", high: 40.08, average: 29.28, low: 14.64 },
    { day: "Saturday", high: 46.56, average: 32.98, low: 20.88 },
];

const chartConfig = {
    high: { label: "High", color: "hsl(var(--chart-1))" },
    average: { label: "Average", color: "hsl(var(--chart-2))" },
    low: { label: "Low", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default function Prices() {
    return (
        <div className="flex flex-col justify-between gap-4">
            <div className="grid grid-cols-[auto_1fr_auto_auto] items-end gap-4">
                <div className="flex flex-col">
                    <h2 className="text-lg font-georgia">Average Prices</h2>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm leading-none">
                        Dec 15, 2024 - Dec 21, 2024
                    </div>
                </div>
                <div />
                <div className="flex flex-col text-xs bg-muted rounded-md p-2 -mb-2">
                    <h3 className="text-muted-foreground leading-none uppercase">Last Price</h3>
                    <div className="font-berkeley-mono">$32.98/GPU/day</div>
                </div>
                <div className="flex flex-col text-xs bg-muted rounded-md p-2 -mb-2">
                    <h3 className="text-muted-foreground leading-none uppercase">Availability</h3>
                    <div className="font-berkeley-mono">12,958/15,000 GPUs</div>
                </div>
            </div>
            <div>
                <ChartContainer config={chartConfig} className="font-berkeley-mono">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: -10, right: 25, top: 0, bottom: 0 }}
                        height={300}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(v: string) => v.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(v: number) => `$${v.toFixed(2)}`}
                        />
                        <ChartTooltip cursor={true} content={<ChartTooltipContent dollarAmount />} />
                        <Line
                            dataKey="high"
                            type="monotone"
                            stroke="var(--color-high)"
                            strokeWidth={2}
                            dot={{ fill: "var(--color-high)" }}
                            activeDot={{ r: 5 }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(v: number) => `$${v.toFixed(2)}`}
                            />
                        </Line>
                        <Line
                            dataKey="average"
                            type="monotone"
                            stroke="var(--color-average)"
                            strokeWidth={2}
                            dot={{ fill: "var(--color-average)" }}
                            activeDot={{ r: 5 }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(v: number) => `$${v.toFixed(2)}`}
                            />
                        </Line>
                        <Line
                            dataKey="low"
                            type="monotone"
                            stroke="var(--color-low)"
                            strokeWidth={2}
                            dot={{ fill: "var(--color-low)" }}
                            activeDot={{ r: 5 }}
                        >
                            <LabelList
                                position="bottom"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(v: number) => `$${v.toFixed(2)}`}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </div>
            <div className="flex justify-between items-center text-muted-foreground font-medium text-sm leading-none">
                <div className="flex items-center gap-2">
                    Average up $3.70 from yesterday <TrendingUp className="h-4 w-4" />
                </div>
                <Link href="/" className="group flex items-center gap-1 hover:underline">
                    Learn how the market works{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
