"use client";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts";

const chartData = [
    { day: "Sunday", high: 1.68, average: 1.2, low: 0.75 },
    { day: "Monday", high: 1.41, average: 0.84, low: 0.4 },
    { day: "Tuesday", high: 1.85, average: 1.2, low: 0.6 },
    { day: "Wednesday", high: 1.75, average: 1.0, low: 0.3 },
    { day: "Thursday", high: 1.85, average: 1.4, low: 0.8 },
    { day: "Friday", high: 1.45, average: 1, low: 0.39 },
    { day: "Saturday", high: 1.72, average: 1.15, low: 0.65 },
];

const chartConfig = {
    high: { label: "High", color: "hsl(var(--chart-1))" },
    average: { label: "Average", color: "hsl(var(--chart-2))" },
    low: { label: "Low", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default function PriceHistory() {
    return (
        <div>
            <h2 className="text-lg font-georgia">Average Prices</h2>
            <div>
                <ChartContainer config={chartConfig} className="font-berkeley-mono">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: -10, right: 20, top: 20, bottom: 20 }}
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
                <div>Dec 12 - Dec 18, 2024</div>
                <div className="flex items-center gap-2">
                    Average up $0.15 from yesterday <TrendingUp className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
}
