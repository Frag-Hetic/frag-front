"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FileSizeChunkChartProps {
  chartData: { fileSize: number; chunkCount: number }[];
}

export function FileSizeChunkChart({ chartData }: FileSizeChunkChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>File Size vs Chunk Count</CardTitle>
        <CardDescription>
          Showing the relationship between file size and chunk count
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="fileSize"
              label={{
                value: "File Size (MB)",
                position: "insideBottomRight",
                offset: -5,
              }}
              tickFormatter={(value) => `${value} MB`}
            />
            <YAxis
              label={{
                value: "Chunk Count",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="chunkCount"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
