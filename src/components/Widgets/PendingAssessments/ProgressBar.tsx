import { LinearProgress, Theme } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import React from "react";

type Props = {
  total: number;
  progress: number;
  color?: string;
  backgroundColor?: string;
  thickness?: number;
  width?: number;
};

export default function  ProgressBar (props: Props) {
    const {
        total,
        progress,
        color,
        backgroundColor,
        thickness = 10,
    } = props;

    const BorderLinearProgress = withStyles((theme: Theme) => ({
        root: {
            height: thickness,
            borderRadius: thickness / 2,
        },
        colorPrimary: {
            backgroundColor: backgroundColor ?? theme.palette.grey[200],
        },
        bar: {
            borderRadius: thickness / 2,
            backgroundColor: color ?? theme.palette.info.main,
        },
    }))(LinearProgress);

    return (
        <BorderLinearProgress
            variant="determinate"
            value={(progress/total) * 100} />
    );
}
// import { LinearProgress, Theme } from "@mui/material";
// import { createStyles } from "@mui/styles";
// import withStyles from '@mui/styles/withStyles';
// import React from "react";

// interface BorderLinearProgressStyleProps {
//     total: number;
//     progress: number;
//     color?: string;
//     backgroundColor?: string;
//     thickness: number;
//     width?: number;
// };

// interface BorderLinearProgress {
//     total: number;
//     progress: number;
// }

// const styles = (theme: Theme) => createStyles({
//     root: {
//         height: (props: BorderLinearProgressStyleProps) => props.thickness,
//         borderRadius: (props: BorderLinearProgressStyleProps) => props.thickness / 2,
//     },
//     colorPrimary: {
//         backgroundColor: (props: BorderLinearProgressStyleProps) => props.backgroundColor ?? theme.palette.grey[200],
//     },
//     bar: {
//         borderRadius: (props: BorderLinearProgressStyleProps) => props.thickness / 2,
//         backgroundColor: (props: BorderLinearProgressStyleProps) => props.color ?? theme.palette.info.main,
//     },
// });
// const Progress = ({ progress, total }: BorderLinearProgress) => (
//     <LinearProgress
//         variant="determinate"
//         value={(progress / total) * 100}
//     />);

// const BorderLinearProgress = withStyles(styles)(Progress);

// interface ProgressBarProps {
//     total: number;
//     progress: number;
//     color?: string;
//     backgroundColor?: string;
//     thickness?: number;
//     width?: number;
// };

// export default function ProgressBar(props: ProgressBarProps) {
//     const {
//         total,
//         progress,
//         color,
//         backgroundColor,
//         thickness = 10,
//     } = props;

//     return (
//         <BorderLinearProgress
//             total={total}
//             progress={progress}
//             color={color}
//             backgroundColor={backgroundColor}
//             thickness={thickness} />
//     );
// }
