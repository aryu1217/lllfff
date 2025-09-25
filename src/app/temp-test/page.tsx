import PlotScoreGauge from "@/components/dashboard/PlotScoreGauge";
import PAHLineChart, { MonthlyPAH } from "@/components/dashboard/PAHLineChart";
import DBHBarChart from "@/components/dashboard/DBHBarChart";

const demoValues: MonthlyPAH = {
  1: 30,  2: 20,  3: 50,  4: 40,  5: 60,  6: 70,
  7: 80,  8: 90,  9: 100, 10: 85, 11: 70, 12: 65,
};

export default function TempTestPage() {
  return (
    <div>
      <PlotScoreGauge value={52} />
      <PAHLineChart values={demoValues} title="PAH 시계열" />
      <DBHBarChart
        data={[
          { dbh: 10, count: 5 },
          { dbh: 20, count: 15 },
          { dbh: 30, count: 25 },
          { dbh: 40, count: 10 },
          { dbh: 50, count: 8 },
        ]}
        title="임시 DBH 분포"
        unit="cm"
      />    
    </div>
  );
}
