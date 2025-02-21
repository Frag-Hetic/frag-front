"use client";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Legend } from "recharts"; // Import du composant Legend
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartConfig = {
  size: {
    label: "Espace utilisé",
  },
  images: {
    label: "Images",
    color: "hsl(var(--chart-1))",
  },
  documents: {
    label: "Documents",
    color: "hsl(var(--chart-2))",
  },
  videos: {
    label: "Vidéos",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Autres",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function FileTypePieChart({
  chartDataMimeType,
}: {
  chartDataMimeType: { mimeType: string; compressedSize: number }[];
}) {
  const totalStorage = 2500;
  const currentStorage = chartDataMimeType.reduce(
    (sum, item) => sum + item.compressedSize,
    0
  );
  const isCloseToFull = currentStorage / totalStorage > 0.8;

  const mimeTypeGroups = chartDataMimeType.reduce(
    (acc, { mimeType, compressedSize }) => {
      if (!acc[mimeType]) {
        acc[mimeType] = 0;
      }
      acc[mimeType] += compressedSize;
      return acc;
    },
    {} as Record<string, number>
  );

  const getColorByMimeType = (mimeType: string) => {
    switch (mimeType) {
      case "image/jpeg":
      case "image/png":
        return chartConfig.images.color;
      case "video/mp4":
      case "video/webm":
        return chartConfig.videos.color;
      case "application/pdf":
        return chartConfig.documents.color;
      default:
        return chartConfig.other.color;
    }
  };

  const chartData = Object.keys(mimeTypeGroups).map((mimeType) => ({
    filetype: mimeType,
    size: mimeTypeGroups[mimeType],
    fill: getColorByMimeType(mimeType),
  }));

  if (chartDataMimeType.length === 0) {
    return <Skeleton className="w-full h-full rounded-full" />;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Répartition des fichiers</CardTitle>
        <CardDescription>Analyse de l'espace de stockage</CardDescription>
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
              dataKey="size"
              nameKey="filetype"
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
                          className={`text-2xl font-bold ${isCloseToFull ? "fill-red-500" : "fill-foreground"}`}
                        >
                          {currentStorage.toLocaleString()} MB
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 20}
                          className="fill-muted-foreground"
                        >
                          Utilisé sur {totalStorage.toLocaleString()} MB
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value: string) => {
                console.log(mimeTypeGroups[value])
                const size = mimeTypeGroups[value] || 0; 
                const label = chartConfig[value as keyof typeof chartConfig]?.label || value; 
                return `${label}: ${size.toLocaleString()} MB`; 
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Occupation à {((currentStorage / totalStorage) * 100).toFixed(1)}%{" "}
          {isCloseToFull && <TrendingUp className="h-4 w-4 text-red-500" />}
        </div>
        <div className="leading-none text-muted-foreground">
          Répartition des fichiers stockés
        </div>
      </CardFooter>
    </Card>
  );
}
