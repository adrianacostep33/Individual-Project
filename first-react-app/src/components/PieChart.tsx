import { ITotalCategorySpendings } from "../sections/Categories";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType } from "@mui/x-charts";

interface PieChartProps {
  data: ITotalCategorySpendings[];
  colors?: string[];
}

const Chart = ({ data, colors }: PieChartProps) => {
  const chartData = data
    .filter((data) => data.amount !== 0)
    .map((data, index) => {
      return {
        id: index,
        value: data.amount,
        label: data.name,
      };
    });

  const TOTAL = chartData.map((item) => item!.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  const sizing = {
    margin: { right: 5 },
    width: 350,
    height: 350,
    legend: { hidden: true },
  };

  return (
    <PieChart
      colors={colors}
      series={[
        {
          data: chartData,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
};

export default Chart;
