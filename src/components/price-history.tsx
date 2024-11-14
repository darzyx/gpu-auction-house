"use client";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartData = [
    { day: "Sunday", high: 1.3, average: 0.8, low: 0.4 },
    { day: "Monday", high: 1.85, average: 1.2, low: 0.6 },
    { day: "Tuesday", high: 1.75, average: 1.0, low: 0.3 },
    { day: "Wednesday", high: 1.85, average: 1.4, low: 0.8 },
    { day: "Thursday", high: 1.6, average: 0.9, low: 0.4 },
    { day: "Friday", high: 1.9, average: 1.3, low: 0.7 },
    { day: "Saturday", high: 1.5, average: 0.95, low: 0.6 },
];

const chartConfig = {
    high: { label: "High", color: "hsl(var(--chart-1))" },
    average: { label: "Average", color: "hsl(var(--chart-2))" },
    low: { label: "Low", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default function PriceHistory() {
    return (
        <div>
            <div>
                <div>Average Prices</div>
                <div>Dec 12 - Dec 18, 2024</div>
            </div>
            <div>
                <ChartContainer config={chartConfig}>
                    <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="high"
                            type="monotone"
                            stroke="var(--color-high)"
                            strokeWidth={2}
                            dot={{ fill: "var(--color-high)" }}
                            activeDot={{ r: 5 }}
                        />
                        <Line
                            dataKey="average"
                            type="monotone"
                            stroke="var(--color-average)"
                            strokeWidth={2}
                            dot={{ fill: "var(--color-average)" }}
                            activeDot={{ r: 5 }}
                        />
                        <Line
                            dataKey="low"
                            type="monotone"
                            stroke="var(--color-low)"
                            strokeWidth={2}
                            dot={{ fill: "var(--color-low)" }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
            <div>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Average price up $0.15 from Sunday <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Showing cost/GPU/hour for the past week
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
