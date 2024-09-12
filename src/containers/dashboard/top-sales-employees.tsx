"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import Cookies from "js-cookie";
import http from "@/utils/http"; // Adjust based on your project structure

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  totalRevenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TopSalesEmployees() {
  const [chartData, setChartData] = useState<{ employeeName: string; totalRevenue: number }[]>([]);

  const fetchEmployeeRevenue = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        http.setToken(token);
      }
      const response = await http.get(
        `/statistics/revenue-by-employee?startDate=2024-01-01T00:00:00&endDate=2024-12-31T23:59:59`
      );
      if (response.data) {
        setChartData(response.data);
      }
    } catch (error) {
      console.error("Error fetching employee revenue data:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeRevenue();
  }, []);

  return (
    <Card className="flex-[2]">
      <CardHeader>
        <CardTitle>Top Sales Employees</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="employeeName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="totalRevenue" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="totalRevenue" layout="vertical" radius={5} fill="var(--color-totalRevenue)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// "use client";

// import { TrendingUp } from "lucide-react";
// import { Bar, BarChart, XAxis, YAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ];

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Yasou",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Zed",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Yone",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Malphite",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Lesin",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig;

// export function TopSalesEmployees() {
//   return (
//     <Card className="flex-[2]">
//       <CardHeader>
//         <CardTitle>Top Sales Employees</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart
//             accessibilityLayer
//             data={chartData}
//             layout="vertical"
//             margin={{
//               left: 0,
//             }}
//           >
//             <YAxis
//               dataKey="browser"
//               type="category"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) =>
//                 chartConfig[value as keyof typeof chartConfig]?.label
//               }
//             />
//             <XAxis dataKey="visitors" type="number" hide />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Bar dataKey="visitors" layout="vertical" radius={5} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }
