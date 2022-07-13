import XYLineChart,
{ LineChartData } from "./XYLineChart";
import { utils } from "@kl-engineering/kidsloop-px";
import { useGetStudentAttendanceRate } from "@kl-engineering/reports-api-client";
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
import {
    useEffect,
    useState,
} from "react";
import {
    FormattedMessage,
    useIntl,
} from "react-intl";
import { currentOrganizationState, useGlobalStateValue } from "@kl-engineering/frontend-state";
import StudentAttendanceNoData from "./StudentAttendanceNoData/StudentAttendanceNoData";
import { HomeScreenWidgetWrapper } from "@kl-engineering/kidsloop-px";
import WidgetWrapperError from "@/components/WidgetWrapperError";
import { Context } from "@/components/models/widgetContext";
import { WidgetType } from "@/components/models/widget.model";
import React from "react";

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

export interface StudentAttendanceWidgetProps {
    widgetContext: Context;
}

const StudentAttendanceWidget: React.FC<StudentAttendanceWidgetProps> = (props) => {
    const intl = useIntl();
    const classes = useStyles();
    const currentOrganization = useGlobalStateValue(currentOrganizationState);
    const organizationName = currentOrganization?.name ?? ``;
    const organizationId = currentOrganization?.id ?? ``;
    const organizationPrimaryColor = currentOrganization?.branding?.primaryColor ?? (organizationName ? utils.stringToColor(organizationName) : PRIMARY_THEME_COLOR);
    const [attendanceData, setAttendanceData] = useState<LineChartData[]>([]);
    const [averageAttendance, setAverageAttendance] = useState(0);
    const { editing = false, removeWidget, layouts, widgets } = props.widgetContext;
    const onRemove = () => removeWidget(WidgetType.STUDENTATTENDANCE, widgets, layouts);
    const {
        data,
        isFetching: isStudentAttendanceLoading,
        isSuccess: isStudentAttendanceSuccess,
        refetch,
    } = useGetStudentAttendanceRate({
        org: organizationId,
    });

    useEffect(() => {
        if (!data?.info) return;
        setAttendanceData(data.info);
        setAverageAttendance(Math.round((data.info.reduce((rate, current) => rate + current.rate, 0) / data.info.length) * 100));
    }, [data]);

    return (
        <HomeScreenWidgetWrapper
            label={
                intl.formatMessage({
                    id: `home.student.attendanceWidget.containerTitleLabel`,
                })
            }
            noData={!attendanceData?.length}
            loading={isStudentAttendanceLoading}
            error={!isStudentAttendanceSuccess}
            errorScreen={<WidgetWrapperError reload={refetch} />}
            noDataScreen={<StudentAttendanceNoData />}
            editing={editing}
            onRemove={onRemove}
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
                                noData={false}
                            />
                        )}
                    </ParentSize>
                </Box>
            </Box>
        </HomeScreenWidgetWrapper>
    );
}

export default StudentAttendanceWidget;
