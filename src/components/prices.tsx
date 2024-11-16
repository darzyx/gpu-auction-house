"use client";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ArrowRight, TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts";
import { Separator } from "./ui/separator";

const chartData = [
    { day: "Sunday", high: 1.8, average: 1.32, low: 0.87 },
    { day: "Monday", high: 1.33, average: 0.76, low: 0.32 },
    { day: "Tuesday", high: 2.05, average: 1.42, low: 0.82 },
    { day: "Wednesday", high: 1.97, average: 1.22, low: 0.52 },
    { day: "Thursday", high: 2.06, average: 1.62, low: 1.02 },
    { day: "Friday", high: 1.67, average: 1.22, low: 0.61 },
    { day: "Saturday", high: 1.94, average: 1.37, low: 0.87 },
];

const chartConfig = {
    high: { label: "High", color: "hsl(var(--chart-1))" },
    average: { label: "Average", color: "hsl(var(--chart-2))" },
    low: { label: "Low", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default function Prices() {
    return (
        <div className="flex flex-col justify-between gap-4">
            <div className="grid grid-cols-[auto_1fr_auto_auto] items-end gap-8">
                <div className="flex flex-col">
                    <h2 className="text-lg font-georgia">Average Prices</h2>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm leading-none">
                        Dec 15, 2024 - Dec 21, 2024
                    </div>
                </div>
                <div />
                <div className="flex flex-col text-xs">
                    <div className="text-muted-foreground leading-none uppercase">Last Average</div>
                    <h2 className="font-berkeley-mono">$1.37/GPU/hour</h2>
                </div>
                <div className="flex flex-col text-xs">
                    <div className="text-muted-foreground leading-none uppercase">Availability</div>
                    <h2 className="font-berkeley-mono">12,958 GPUs</h2>
                </div>
            </div>
            <div>
                <ChartContainer config={chartConfig} className="font-berkeley-mono">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: -10, right: 20, top: 0, bottom: 0 }}
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
                    Average up $0.15 from yesterday <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2">
                    Learn how the market works <ArrowRight className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
}
