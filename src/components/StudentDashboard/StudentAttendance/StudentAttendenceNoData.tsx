
import XYLineChart,
{ LineChartData } from "./XYLineChart";
import NoDataMessageWrapper from "@/components/NoDataMessage/NoDataMessageWrapper";
import { CalendarTodayOutlined } from '@mui/icons-material';
import {
    Box,
    Theme,
    Typography,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import { ParentSize } from "@visx/responsive";
import React,
{
    useEffect,
    useState,
} from "react";
import {
    FormattedMessage,
    useIntl,
} from "react-intl";
import { currentOrganizationState, useGlobalStateValue } from "@kl-engineering/frontend-state";
import { utils } from "@kl-engineering/kidsloop-px";

const useStyles = makeStyles((theme: Theme) => createStyles({
    widgetContent: {
        display: `grid`,
        gridTemplateColumns: `1fr`,
        gridTemplateRows: `20% 80%`,
        width: `100%`,
        height: `100%`,
    },
    banner: {
        borderRadius: 15,
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(3, 4),
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
        "& .bannerLeft": {
            display: `flex`,
            flexDirection: `row`,
            justifyContent: `flex-start`,
            alignItems: `center`,
            "& *": {
                marginRight: 10,
            },
        },
    },
}));

const PRIMARY_THEME_COLOR = `#0094FF`;

interface Props {
}

export default function StudentAttendanceNoData(props: Props) {
    const intl = useIntl();
    const classes = useStyles();
    const currentOrganization = useGlobalStateValue(currentOrganizationState);
    const organizationName = currentOrganization?.name ?? ``;
    const organizationPrimaryColor = currentOrganization?.branding?.primaryColor ?? (organizationName ? utils.stringToColor(organizationName) : PRIMARY_THEME_COLOR);
    const [attendanceData, setAttendanceData] = useState<LineChartData[]>([]);
    const [averageAttendance, setAverageAttendance] = useState(0);
    const data = [
        {
            "class_date": "2020-01-18",
            "rate": 0.7
        },
        {
            "class_date": "2020-01-19",
            "rate": 0.05
        },
        {
            "class_date": "2020-01-20",
            "rate": 0.7
        },
        {
            "class_date": "2020-01-21",
            "rate": 0.85
        },
    ];

    useEffect(() => {
        setAttendanceData(data);
        setAverageAttendance(Math.round((data.reduce((rate, current) => rate + current.rate, 0) / data.length) * 100));
    }, []);


    return (
        <NoDataMessageWrapper
            id="home.student.attendence.noData"
            defaultMessage="Monitor your attendance in within a two week period."
        >
            <Box className={classes.widgetContent}>
                <Box className={classes.banner}>
                    <div className="bannerLeft">
                        <CalendarTodayOutlined
                            fontSize="large"
                            color="primary"
                        />
                        <div>
                            <Typography variant="body1">
                                <FormattedMessage id="home.student.attendanceWidget.legend" />
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Typography
                            variant="h5"
                            color="primary"
                        >
                            {averageAttendance}%
                        </Typography>
                    </div>
                </Box>
                <Box>
                    <ParentSize>
                        {({ width, height }) => (
                            <XYLineChart
                                data={attendanceData}
                                width={width}
                                height={height}
                                color={organizationPrimaryColor}
                                noData
                            />
                        )}
                    </ParentSize>
                </Box>
            </Box>
        </NoDataMessageWrapper>
    );
}
