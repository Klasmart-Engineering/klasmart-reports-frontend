import { defaultOptions } from "./defaultOptions";
import { Props as DonutProps } from "./typings";
import { Pie } from "@visx/shape";

const Donut: React.VFC<DonutProps> = (props) => {
    const {
        options: {
            pieSize = defaultOptions.pieSize,
            cornerRadius = defaultOptions.cornerRadius,
            radiusWidth = defaultOptions.radiusWidth,
            padAngle = defaultOptions.padAngle,
        } = defaultOptions,
    } = props;

    return (
        <Pie
            data={props.data}
            pieValue={(data) => data.value!}
            outerRadius={pieSize}
            innerRadius={(pieSize ?? 0) - (radiusWidth ?? 0)}
            cornerRadius={cornerRadius}
            padAngle={padAngle}
        >
            {(pie) => {
                return pie.arcs.map((arc) => {
                    return (
                        <g key={arc.data.label} >
                            <path
                                d={pie.path(arc)!}
                                fill={arc.data.color}>
                            </path>
                        </g>
                    );
                });
            }}
        </Pie>
    );
}

export default Donut;
