"use client";

import { Label, Pie, PieChart } from "recharts";

import { AVAILABLE_GPUS, TOTAL_GPUS } from "@/components/trade/exchange/utils";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    {
        category: "high",
        amount: Math.round(AVAILABLE_GPUS * 0.3),
        fill: "var(--color-high)",
    },
    {
        category: "average",
        amount: Math.round(AVAILABLE_GPUS * 0.5),
        fill: "var(--color-average)",
    },
    {
        category: "low",
        amount: Math.round(AVAILABLE_GPUS * 0.2),
        fill: "var(--color-low)",
    },
    {
        category: "unavailable",
        amount: TOTAL_GPUS - AVAILABLE_GPUS,
        fill: "var(--color-other)",
    },
];

const chartConfig = {
    high: {
        label: "High",
        color: "hsl(var(--chart-1))",
    },
    average: {
        label: "Average",
        color: "hsl(var(--chart-2))",
    },
    low: {
        label: "Low",
        color: "hsl(var(--chart-3))",
    },
    unavailable: {
        label: "Unavailable",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig;

export default function AvailabilityChart() {
    return (
        <div>
            <h2 className="text-lg font-georgia leading-none px-4 sm:px-6 lg:px-4 py-0">
                Availability
            </h2>
            <ChartContainer
                config={chartConfig}
                className="w-full aspect-square h-[250px] p-0 m-0"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={chartData}
                        dataKey="amount"
                        nameKey="category"
                        innerRadius={60}
                        strokeWidth={5}
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (
                                    viewBox &&
                                    "cx" in viewBox &&
                                    "cy" in viewBox
                                ) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground text-3xl font-bold"
                                            >
                                                {TOTAL_GPUS}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                GPUs
                                            </tspan>
                                        </text>
                                    );
                                }
                            }}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>
        </div>
    );
}
