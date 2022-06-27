import { createTheme } from "@mui/material";
import { Marker } from "@visx/marker";
import React from "react";

export interface MarkersProps {
    isVerticalMode : boolean;
}

const Markers: React.VFC<MarkersProps> = (props) => {

    const theme = createTheme();

    return (
        <defs>
            <Marker
                id="arrowDown1"
                viewBox="0 0 10 10"
                markerWidth="1.6"
                markerHeight="1.6"
                markerUnits="strokeWidth"
                refX={props.isVerticalMode ? `22.5` : `25`}
                refY={props.isVerticalMode ? `2` : `0`}
                orient="auto">
                <path
                    style={{
                        transform : `rotate(-20deg)`,
                    }}
                    d="M 0 0 L 6 5 L 0 10 z"
                    fill={theme.palette.warning.light}/>
            </Marker>
            <Marker
                id="arrowUp1"
                viewBox="0 0 10 10"
                refX={props.isVerticalMode ? `-24` : `-11.5`}
                refY={props.isVerticalMode ? `1` : `4`}
                markerUnits="strokeWidth"
                markerWidth="1.6"
                markerHeight="1.6"
                orient="auto">
                <path
                    d="M 0 0 L 6 6 L 0 10 z"
                    fill="#F7FF55"/>
            </Marker>
            <Marker
                id="arrowDown2"
                viewBox="0 0 10 10"
                markerWidth="1.6"
                markerHeight="1.6"
                markerUnits="strokeWidth"
                refX={props.isVerticalMode ? `26.5` : `14`}
                refY={props.isVerticalMode ? `1` : `3.5`}
                orient="auto">
                <path
                    style={{
                        transform : `rotate(-10deg)`,
                    }}
                    d="M 0 0 L 6 5 L 0 10 z"
                    fill={theme.palette.warning.light}/>
            </Marker>
            <Marker
                id="arrowUp2"
                viewBox="0 0 10 10"
                refX={props.isVerticalMode ? `-18` : `-21`}
                refY={props.isVerticalMode ? `2.5` : `1`}
                markerUnits="strokeWidth"
                markerWidth="1.6"
                markerHeight="1.6"
                orient="auto">
                <path
                    style={{
                        transform : `rotate(10deg)`,
                    }}
                    d="M 0 0 L 6 5.5 L 0 10 z"
                    fill="#F7FF55"/>
            </Marker>
            <linearGradient
                id="solids"
                x1={props.isVerticalMode ? `100%` : `0%`}
                y1="0%"
                x2="0%"
                y2={props.isVerticalMode ? `0%` : `100%`}>
                <stop
                    offset="0%"
                    stopColor={theme.palette.warning.light} />
                <stop
                    offset="50%"
                    stopColor={theme.palette.warning.light} />
                <stop
                    offset="50%"
                    stopColor={`#F7FF55`} />
                <stop
                    offset="100%"
                    stopColor={`#F7FF55`} />
            </linearGradient>
        </defs>
    );
}

export default Markers;
