import attendanceRateDataFormatter from "../attendanceRateDataFormatter";
import { ClassAttendanceLegendLabels } from "../../../models/data.model";
import DonutWithText from "../Donut/DonutWithText";
import Legend from "../Donut/Legend";
import { useWidth } from "@kl-engineering/kidsloop-px";
import { FiberManualRecord } from "@mui/icons-material";
import {
    Theme,
    Typography,
    useTheme,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import { useMemo } from "react";
import {
    FormattedMessage,
    useIntl,
} from "react-intl";
import NoDataMessageWrapper from "@/components/NoDataMessage";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: `100%`,
            height: `90%`,
            display: `grid`,
        },
        rootDesktop: {
            gridTemplateColumns: `65% 35%`,
            gridTemplateRows: `100%`,
        },
        rootMobile: {
            gridTemplateColumns: `100%`,
            gridTemplateRows: `70% 30%`,
        },
        titleWrapper: {
            display: `flex`,
            alignItems: `center`,
        },
        title: {
            color: theme.palette.grey[600],
            fontSize: 12,
            marginLeft: 5,
        },
        icon: {
            color: theme.palette.info.light,
            fontSize: 10,
        },
    }));

const AttendanceRateNoData: React.VFC = () => {
    const intl = useIntl();
    const theme = useTheme();
    const classes = useStyles();
    const width = useWidth();
    const defaultView = width !== `xs`;

    const data = {
        "info": {
            "grp1": 0.28,
            "grp2": 0.32,
            "grp3": 0.40,
            "grp1count": 47,
        },
        "lastupdate": 1654761820,
        "expiry": 1654763620,
        "successful": true,
    }

    const dataLabels: ClassAttendanceLegendLabels = {
        high: intl.formatMessage({
            id: `home.attendance.legendHigh`,
        }),
        medium: intl.formatMessage({
            id: `home.attendance.legendMedium`,
        }),
        low: intl.formatMessage({
            id: `home.attendance.legendLow`,
        }),
    };

    const formattedData = useMemo(() => {
        if (!data) return [];
        return attendanceRateDataFormatter(data, theme, dataLabels);
    }, [ dataLabels ]);

    return (
        <NoDataMessageWrapper
            id="home.teacher.attendance.noData"
        >
            <div className={classes.titleWrapper}>
                <FiberManualRecord className={classes.icon} />
                <Typography className={classes.title}>
                    <FormattedMessage id="home.attendance.title" />
                </Typography>
            </div>

            {data && <div
                className={`${classes.root} ${defaultView ? classes.rootDesktop : classes.rootMobile}`}
                >
                <DonutWithText
                    data={formattedData}
                    options={{
                        pieSize: defaultView ? 100 : 70,
                        radiusWidth: defaultView? 24 : 16,
                        padAngle: 0,
                    }}
                    />
                <Legend
                    data={formattedData}
                    format={defaultView ? `desktop` : `mobile`}
                    />
            </div>
            }
            </NoDataMessageWrapper>
    );
}

export default AttendanceRateNoData;
