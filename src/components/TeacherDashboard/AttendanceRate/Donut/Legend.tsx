import { Data } from "./typings";
import {
    Theme,
    Typography,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';

export interface LegendProps {
    data: Data[];
    format: "desktop" | "mobile";
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `space-evenly`,
        },
        rootDesktop: {
            flexDirection: `column`,
        },
        rootMobile: {
            flexDirection: `row`,
        },
        container: {
            display: `flex`,
            alignItems: `left`,
            width: `100%`,
            flexDirection: `column`,
        },
        title: {
            color: theme.palette.grey[700],
            marginRight: 10,
        },
        titleDesktop: {
            fontSize: `1em`,
            textAlign: `left`,
        },
        titleMobile: {
            fontSize: `0.8em`,
            textAlign: `center`,
        },
        percentage: {
            fontWeight: 400,
        },
        percentageDesktop: {
            fontSize: `2em`,
            textAlign: `left`,
        },
        percentageMobile: {
            fontSize: `1.8em`,
            textAlign: `center`,
        },
    }));

const Legend: React.VFC<LegendProps> = (props) => {
    const classes = useStyles();
    return (
        <div
            className={`${classes.root} ${props.format === `desktop` ? classes.rootDesktop : classes.rootMobile}`}>
            {props.data && props.data.map(item => {
                return (
                    <div
                        key={item.label}
                        className={classes.container}>
                        <Typography className={`${classes.title} ${props.format === `desktop` ? classes.titleDesktop : classes.titleMobile}`}>
                            {item.label}
                        </Typography>
                        <Typography
                            className={`${classes.percentage} ${props.format === `desktop` ? classes.percentageDesktop : classes.percentageMobile}`}
                            style={{
                                color: item.color,
                            }}>
                            {Math.floor(item.value! *100)}%
                        </Typography>
                    </div>
                );
            })}
        </div>
    );
}

export default Legend;