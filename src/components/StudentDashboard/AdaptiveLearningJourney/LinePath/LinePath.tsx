import Markers from "./Marker";
import { Theme } from "@mui/material";
import {
    createStyles,
    makeStyles,
} from "@mui/styles";
import React,
{
    createRef,
    Ref,
    useEffect,
    useRef,
} from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root : {
            position: `absolute`,
            overflow: `visible`,
            top : 0,
        },
    }));

export interface DataObj {
    level: number;
    ratings: number;
    completed: boolean;
    type: string;
    category: string;
    hasBooster: boolean;
    boosterRatings: number;
    boosterCompleted: boolean;
    slides: number;
}

export interface LinePathProps {
    isVerticalMode : boolean;
    width: number;
    connectorSVGHeight : number;
    connectorSVGWidth : number;
    mockData : DataObj[];
    levelsRef : Ref<HTMLDivElement>[];
}

const LinePath: React.VFC<LinePathProps> = (props) => {
    const classes = useStyles();
    const connectorsRef : RefObject<SVGPathElement> = useRef(props.mockData.map(() => createRef()));

    useEffect(() => {
        const slider = document.querySelector(`#slider`)?.getBoundingClientRect();
        props.mockData.forEach((data, i) => {
            if(!props.mockData[i+1]) return;
            const source = props.levelsRef[i]?.current?.getBoundingClientRect();
            const target = props.levelsRef[i + 1]?.current?.getBoundingClientRect();
            const connector = connectorsRef.current[i].current as HTMLElement;
            if(!data.hasBooster){
                const posnA = {
                    x: source?.left - (slider?.left ?? 0) + (props.isVerticalMode ? 15 : 0),
                    y: source?.top - (slider?.top ?? 0) + (props.isVerticalMode ? source?.height : (source?.height / 2)),
                };
                const posnB = {
                    x: target?.left - (slider?.left ?? 0) + (props.isVerticalMode ? 15 : 0),
                    y: target?.top - (slider?.top ?? 0) + (props.isVerticalMode ? 0 : (target?.height / 2)),
                };
                const dStr = props.isVerticalMode ?
                    `M${posnA.x},${posnA.y} C${posnA.x},${posnA.y + 20} ${posnB.x},${posnB.y - 20} ${posnB.x},${posnB.y}`
                    :
                    `M${posnA.x},${posnA.y} C${posnA.x + 100},${posnA.y} ${posnB.x - 180},${posnB.y} ${posnB.x},${posnB.y}`;
                connector.setAttribute(`d`, dStr);
            } else {
                const posnA = {
                    x: source?.left - (slider?.left ?? 0) + (props.isVerticalMode ? (source?.width / 2) : 0),
                    y: source?.top - (slider?.top ?? 0) + (props.isVerticalMode ? (source?.height - 30) : 0),
                };
                const posnB = {
                    x: target?.left - (slider?.left ?? 0) + (props.isVerticalMode ? (target?.width / 2) : 0),
                    y: target?.top - (slider?.top ?? 0) + (props.isVerticalMode ? 30 : 0),
                };
                const dStr = props.isVerticalMode ?
                    `M${posnA.x},${posnA.y} C${posnA.x + 150},${posnA.y - 20} ${posnB.x + 150},${posnB.y} ${posnB.x},${posnB.y}`
                    :
                    `M${posnA.x - 15},${posnA.y} C${posnA.x - (i % 2 === 0 ? 30 : 0)},${posnA.y - 200} ${posnB.x - (i % 2 === 0 ? 70 : 30)},${posnB.y - 200} ${posnB.x - 50},${posnB.y}`;
                connector.setAttribute(`d`, dStr);
            }
        });

    }, [ props.isVerticalMode ]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.isVerticalMode ? `100%` : props.connectorSVGWidth}
            height={props.isVerticalMode ? props.connectorSVGHeight : `100%`}
            className={classes.root}
        >
            {props.mockData.map((data, i) => (
                data.hasBooster ?
                    <path
                        key={data.level}
                        ref={connectorsRef.current[i]}
                        fill="none"
                        stroke={`url(#solids)`}
                        strokeWidth={props.isVerticalMode ? !data.completed ? `10` : `15` : `24`}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        markerStart={i % 2 === 0 ? `url(#arrowUp2)` : `url(#arrowUp1)`}
                        markerEnd={i % 2 === 0 ? `url(#arrowDown2)` : `url(#arrowDown1)`}
                    />
                    :
                    <path
                        key={data.level}
                        ref={connectorsRef.current[i]}
                        fill="none"
                        stroke={`#F7FF55`}
                        strokeWidth={props.isVerticalMode ? !data.completed ? `10` : `15` : !data.completed ? `10` : `24`}
                        strokeDasharray={!data.completed ? `1, 20` : 0}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
            ))}
            <Markers isVerticalMode={props.isVerticalMode}/>
        </svg>
    );
}

export default LinePath;