"use client";

import { Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "../ui/skeleton";

// Configuration des couleurs et labels
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

export function FileTypePieChart({ chartDataMimeType }: { chartDataMimeType: any[] }) {
  const totalStorage = 2500;
  const currentStorage = chartDataMimeType.reduce((sum, item) => sum + item.compressedSize, 0);
  const isCloseToFull = currentStorage / totalStorage > 0.8;

  // Regroupement des tailles compressées par type MIME
  const mimeTypeGroups = chartDataMimeType.reduce((acc, { mimeType, compressedSize }) => {
    if (!acc[mimeType]) {
      acc[mimeType] = 0;
    }
    acc[mimeType] += compressedSize;
    return acc;
  }, {});

  console.log(mimeTypeGroups)

    // Fonction pour obtenir une couleur basée sur le type MIME en utilisant chartConfig
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

  // Conversion du regroupement en tableau pour le PieChart
  const chartData = Object.keys(mimeTypeGroups).map((mimeType) => ({
    filetype: mimeType,
    size: mimeTypeGroups[mimeType],
    fill: getColorByMimeType(mimeType),
  }));



  if (chartDataMimeType.length === 0) {
    return <Skeleton className="w-full h-full rounded-full" />;
  }

  return (
    <ChartContainer
      config={{} as ChartConfig}
      className="mx-auto aspect-square max-h-[250px]"
      style={{ marginTop: "0" }}
    >
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
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
                      y={viewBox.cy ? viewBox.cy + 20 : 20}
                      className="fill-muted-foreground"
                    >
                    {/*   / {totalStorage.toLocaleString()} MB */}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
