import {
    Box,
    Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import {
    createStyles,
    makeStyles,
} from "@mui/styles";
import {
    LegendItem,
    LegendLabel,
    LegendOrdinal,
} from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";
import React from "react";
import { useIntl } from "react-intl";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        legendWrapper: {
            position: `absolute`,
            top: theme.spacing(0.5),
            height: 14,
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `center`,
        },
        legendItemWrapper: {
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            height: 14,
        },
        legendLabelText: {
            fontWeight: 400,
            [theme.breakpoints.down(`sm`)]: {
                fontSize: 10,
            },
            fontSize: 12,
            color: theme.palette.grey[500],
        },
        legendTitle: {
            [theme.breakpoints.down(`sm`)]: {
                fontSize: 12,
            },
            fontSize: 14,
        },
    }));

export interface ChartLegendProps {
    dataLength: number;
    width: number;
    height: number;
    colorRange: any[];
}

const ChartLegend: React.VFC<ChartLegendProps> = (props) => {
    const intl = useIntl();
    const classes = useStyles();
    const legendShapeWidth = 10;
    const legendShapeHeight = 10;
    const legendTitle = props.dataLength === 1 ? intl.formatMessage({
        id: `home.student.learningOutcomeWidget.singleSkillTitle`,
    }) : intl.formatMessage({
        id: `home.student.learningOutcomeWidget.legendTitle`,
    }, {
        skillcount: props.dataLength,
    });
    const achieved = intl.formatMessage({
        id: `home.student.learningOutcomeWidget.legendAchieved`,
    });
    const notAchieved = intl.formatMessage({
        id: `home.student.learningOutcomeWidget.legendNotAchieved`,
    });
    const ordinalColorScale = scaleOrdinal({
        domain: [ achieved, notAchieved ],
        range: props.dataLength % 2 === 0 ? props.colorRange : props.colorRange.reverse(),
    });
    return (
        <Box
            sx={{
                width: props.width,
                height: props.height,
            }}
            className={classes.legendWrapper}
        >
            <Typography
                variant="subtitle2"
                className={classes.legendTitle}
            >
                {legendTitle}
            </Typography>
            <LegendOrdinal
                scale={ordinalColorScale}
                labelFormat={(label: any) => label}
            >
                {(labels) => (
                    <Box className={classes.legendItemWrapper}>
                        {labels.map((label, i) => (
                            <LegendItem
                                key={`legend-quantile-${i}`}
                                margin="0 5px"
                            >
                                <svg
                                    width={legendShapeWidth}
                                    height={legendShapeHeight}
                                >
                                    <rect
                                        fill={label.value}
                                        width={legendShapeWidth}
                                        height={legendShapeHeight}
                                        rx={2}
                                    />
                                </svg>
                                <LegendLabel
                                    align="left"
                                    margin="0 0 0 5px"
                                >
                                    <Typography
                                        variant="subtitle2"
                                        color="grey"
                                        className={classes.legendLabelText}
                                    >
                                        {label.text}
                                    </Typography>
                                </LegendLabel>
                            </LegendItem>
                        ))}
                    </Box>
                )}
            </LegendOrdinal>
        </Box>
    );
}

export default ChartLegend;