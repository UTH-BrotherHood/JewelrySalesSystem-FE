"use client";

import * as React from "react";
import { Pie, PieChart, Label } from "recharts";
import Cookies from "js-cookie";
import http from "@/utils/http"; // Adjust based on your project structure

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
  totalQuantitySold: {
    label: "Products Sold",
  },
} satisfies ChartConfig;

export function TopSellChart() {
  const [chartData, setChartData] = React.useState<
    { productName: string; totalQuantitySold: number; fill: string }[]
  >([]);

  const fetchProductSalesQuantities = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        http.setToken(token);
      }
      const response = await http.get(
        `/statistics/product-sales-quantities`
      );
      if (response.data) {
        const updatedData = response.data.map((item: any, index: number) => ({
          productName: item.productName,
          totalQuantitySold: item.totalQuantitySold,
          fill: `var(--chart-${index + 1})`, // You can customize color mapping
        }));
        setChartData(updatedData);
      }
    } catch (error) {
      console.error("Error fetching product sales quantities:", error);
    }
  };

  React.useEffect(() => {
    fetchProductSalesQuantities();
  }, []);

  const totalSold = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totalQuantitySold, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-1 flex-col rounded-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top-Selling Products Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="totalQuantitySold"
              nameKey="productName"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                          {totalSold.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Products
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
}

// "use client";

// import * as React from "react";
// import { TrendingUp } from "lucide-react";
// import { Label, Pie, PieChart } from "recharts";

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
//   { browser: "chrome", totalSold: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", totalSold: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", totalSold: 287, fill: "var(--color-firefox)" },
//   { browser: "edge", totalSold: 173, fill: "var(--color-edge)" },
//   { browser: "other", totalSold: 190, fill: "var(--color-other)" },
// ];

// const chartConfig = {
//   totalSold: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig;

// export function TopSellChart() {
//   const totalVisitors = React.useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.totalSold, 0);
//   }, []);

//   return (
//     <Card className="flex flex-1  flex-col  rounded-lg">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Top-Selling Products Chart</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <PieChart>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Pie
//               data={chartData}
//               dataKey="totalSold"
//               nameKey="browser"
//               innerRadius={60}
//               strokeWidth={5}
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-3xl font-bold"
//                         >
//                           {totalVisitors.toLocaleString()}
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) + 24}
//                           className="fill-muted-foreground"
//                         >
//                           Products
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
//     </Card>
//   );
// }
