"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import Cookies from "js-cookie";
import http from "@/utils/http"; // Adjust import based on your project structure

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

const chartConfig = {
  totalRevenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ProductsByRevenue() {
  const [chartData, setChartData] = useState<{ productName: string; totalRevenue: number }[]>([]);

  const fetchRevenueByProduct = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        http.setToken(token);
      }
      const response = await http.get(
        `/statistics/revenue-by-product?startDate=2024-01-01T00:00:00&endDate=2024-12-31T23:59:59`
      );
      if (response.data) {
        setChartData(response.data);
      }
    } catch (error) {
      console.error("Error fetching revenue by product:", error);
    }
  };

  useEffect(() => {
    fetchRevenueByProduct();
  }, []);

  return (
    <Card className="rounded-lg flex-1">
      <CardHeader>
        <CardTitle>Products By Revenue Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-full" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="productName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)} // Limit product name length
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="totalRevenue" fill="var(--color-totalRevenue)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}

// "use client";

// import { TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
//   { month: "Jewelry 01", desktop: 186 },
//   { month: "Jewelry 02", desktop: 305 },
//   { month: "Jewelry 03", desktop: 237 },
//   { month: "Jewelry 04", desktop: 73 },
//   { month: "Jewelry 05", desktop: 209 },
//   { month: "Jewelry 06", desktop: 214 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;

// export function ProductsByRevenue() {
//   return (
//     <Card className="rounded-lg flex-1">
//       <CardHeader>
//         <CardTitle>Products By Revenue Chart</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer className="h-full" config={chartConfig}>
//           <BarChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               top: 20,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
//               <LabelList
//                 position="top"
//                 offset={12}
//                 className="fill-foreground"
//                 fontSize={12}
//               />
//             </Bar>
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
//     </Card>
//   );
// }
