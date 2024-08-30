"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", Jewelry: 186 },
  { month: "February", Jewelry: 305 },
  { month: "March", Jewelry: 237 },
  { month: "April", Jewelry: 73 },
  { month: "May", Jewelry: 209 },
  { month: "June", Jewelry: 214 },
];

const chartConfig = {
  Jewelry: {
    label: "Jewelry",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  return (
    <Card className="rounded-lg flex-1">
      <CardHeader>
        <CardTitle>Revenue Chart</CardTitle>
        <CardDescription>
          Showing total revenue for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: any) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="Jewelry"
              type="natural"
              fill="var(--color-Jewelry)"
              fillOpacity={0.4}
              stroke="var(--color-Jewelry)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
