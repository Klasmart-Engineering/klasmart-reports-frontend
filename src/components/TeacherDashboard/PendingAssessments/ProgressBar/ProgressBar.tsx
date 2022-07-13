import { LinearProgress, Theme } from "@mui/material";
import { withStyles } from '@mui/styles';
import React from "react";

export interface ProgressBarProps {
  total: number;
  progress: number;
  color?: string;
  backgroundColor?: string;
  thickness?: number;
  width?: number;
};

const ProgressBar: React.VFC<ProgressBarProps> = (props) => {
    const {
        thickness = 10,
    } = props;

    const BorderLinearProgress = withStyles((theme: Theme) => ({
        root: {
            height: thickness,
            borderRadius: thickness / 2,
        },
        colorPrimary: {
            backgroundColor: props.backgroundColor ?? theme.palette.grey[300],
        },
        bar: {
            borderRadius: thickness / 2,
            backgroundColor: props.color ?? theme.palette.info.main,
        },
    }))(LinearProgress);

    return (
        <BorderLinearProgress
            variant="determinate"
            value={(props.progress/props.total) * 100} />
    );
}

export default ProgressBar;
