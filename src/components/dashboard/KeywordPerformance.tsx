
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", position: 35 },
  { name: "Feb", position: 32 },
  { name: "Mar", position: 28 },
  { name: "Apr", position: 25 },
  { name: "May", position: 20 },
  { name: "Jun", position: 17 },
  { name: "Jul", position: 15 },
  { name: "Aug", position: 12 },
  { name: "Sep", position: 9 },
  { name: "Oct", position: 7 },
  { name: "Nov", position: 5 },
  { name: "Dec", position: 4 },
];

export function KeywordPerformance() {
  return (
    <Card className="seo-card">
      <CardHeader>
        <CardTitle>Keyword Performance</CardTitle>
        <CardDescription>Average ranking for top 10 keywords</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                reversed
                domain={[1, 40]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `#${value}`}
              />
              <Tooltip
                formatter={(value: number) => [`#${value}`, "Position"]}
                labelFormatter={(label) => `${label}`}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="position"
                stroke="#0077B6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#0077B6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
