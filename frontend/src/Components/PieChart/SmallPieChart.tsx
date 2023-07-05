import {Component} from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';

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
	first_value: number;
	second_value: number;
	first_text: string;
	second_text: string;
}

class SmallPieChart extends Component<PieChartCompProps> {
	colours: string[] = ['#f52e58', '#6da951'];

	get pieData(): PieData[] {
		const {first_value, second_value, first_text, second_text} = this.props;

		return [
			{
				name: first_text,
				value: first_value,
			},
			{
				name: second_text,
				value: second_value,
			},
		];
	}

	CustomTooltip = ({active, payload}: CustomTooltipProps) => {
		if (active && payload && payload.length) {
			return (
				<div
					className="custom-tooltip"
					style={{
						backgroundColor: '#ffff',
						padding: '5px',
						border: '1px solid #cccc',
					}}>
					<label>{`${payload[0].name} : ${payload[0].value}`}</label>
				</div>
			);
		}
		return null;
	};

	render() {
		return (
			<PieChart
				width={230}
				height={230}>
				<Pie
					data={this.pieData}
					color="#000000"
					dataKey="value"
					nameKey="name"
					cx="50%"
					cy="50%"
					fill="#8884d8">
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

export default SmallPieChart;
