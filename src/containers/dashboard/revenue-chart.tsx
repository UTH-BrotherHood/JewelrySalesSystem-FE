"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import http from "@/utils/http"; // Adjust the import based on your project structure
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
  Jewelry: {
    label: "Jewelry",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  const [chartData, setChartData] = useState<{ month: string; Jewelry: number }[]>([]);

  const fetchSalesData = async (month: number, year: number) => {
    try {
      const token = Cookies.get("token");
      if (token) {
        http.setToken(token);
      }
      const response = await http.get(`/statistics/total-sales/month?month=${month}&year=${year}`);
      if (response.data.code === 200) {
        // Assuming the response contains total sales for the given month
        setChartData([{ month: `${month}/${year}`, Jewelry: response.data.result }]);
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
      throw error;
    }
  };

  useEffect(() => {
    // Example: Fetch data for September 2024
    fetchSalesData(9, 2024);
  }, []);

  return (
    <Card className="rounded-lg flex-1">
      <CardHeader>
        <CardTitle>Revenue Chart</CardTitle>
        <CardDescription>
          Showing total revenue for the selected month
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
              tickFormatter={(value: any) => value}
            />
            <YAxis />
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


// "use client";

// import { TrendingUp } from "lucide-react";
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
//   { month: "January", Jewelry: 186 },
//   { month: "February", Jewelry: 305 },
//   { month: "March", Jewelry: 237 },
//   { month: "April", Jewelry: 73 },
//   { month: "May", Jewelry: 209 },
//   { month: "June", Jewelry: 214 },
// ];

// const chartConfig = {
//   Jewelry: {
//     label: "Jewelry",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;

// export function RevenueChart() {
//   return (
//     <Card className="rounded-lg flex-1">
//       <CardHeader>
//         <CardTitle>Revenue Chart</CardTitle>
//         <CardDescription>
//           Showing total revenue for the last 6 months
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <AreaChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value: any) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="line" />}
//             />
//             <Area
//               dataKey="Jewelry"
//               type="natural"
//               fill="var(--color-Jewelry)"
//               fillOpacity={0.4}
//               stroke="var(--color-Jewelry)"
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }
