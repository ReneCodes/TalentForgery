import { Component } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface PieData {
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any;
  label?: string;
}

interface PieChartCompProps {
  width: number;
  passed: number;
  todo: number;
  failed: number;
}

class PieChartComp extends Component<PieChartCompProps> {
  colours: string[] = ['green', 'grey', 'red'];
  
  get pieData(): PieData[] {
    const { passed, todo, failed } = this.props;
    
    return [
      {
        name: "Watched",
        value: passed
      },
      {
        name: "toWatch",
        value: todo
      },
      {
        name: "Overdue",
        value: failed
      }
    ];
  }
  
  CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc"
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}`}</label>
        </div>
      );
    }
    return null;
  };

  render() {
    const { width } = this.props;

    return (
      <PieChart width={730} height={300}>
        <Pie
          data={this.pieData}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={width}
          fill="#8884d8"
        >
          {this.pieData.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={this.colours[index % this.colours.length]}
            />
          ))}
        </Pie>
        <Tooltip content={<this.CustomTooltip />} />
        <Legend />
      </PieChart>
    );
  }
}

export default PieChartComp;