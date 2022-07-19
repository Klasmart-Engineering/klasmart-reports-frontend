import attendanceRateDataFormatter from "./attendanceRateDataFormatter";
import { ClassAttendanceLegendLabels } from "../../models/data.model";
import DonutWithText from "./Donut/DonutWithText";
import Legend from "./Donut/Legend";
import { useWidth, HomeScreenWidgetWrapper } from "@kl-engineering/kidsloop-px";
import { useGetClassAttendanceRateGroup } from "@kl-engineering/reports-api-client";
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
import { currentOrganizationState, useGlobalStateValue } from "@kl-engineering/frontend-state";
import AttendanceRateNoData from "./AttendanceRateNoData/AttendanceRateNoData";
import WidgetWrapperError from "@/components/WidgetWrapperError";
import { BaseWidgetProps } from "@/components/models/widget.model";
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

export interface AttendanceRateWidgetProps extends BaseWidgetProps {};

const AttendanceRateWidget: React.VFC<AttendanceRateWidgetProps> = (props) => {
    const intl = useIntl();
    const theme = useTheme();
    const classes = useStyles();
    const width = useWidth();
    const defaultView = width !== `xs`;
    const currentOrganization = useGlobalStateValue(currentOrganizationState);
    const organizationId = currentOrganization?.id ?? ``;
    const {
        data,
        isFetching,
        isSuccess,
        refetch,
    } = useGetClassAttendanceRateGroup({
        org: organizationId,
    });

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
    }, [data, dataLabels]);

    return (
        <HomeScreenWidgetWrapper
            label={
                intl.formatMessage({
                    id: `home.attendance.containerTitleLabel`,
                })
            }
            loading={isFetching}
            error={!isSuccess}
            errorScreen={<WidgetWrapperError reload={refetch} />}
            noData={!data?.successful}
            noDataScreen={<AttendanceRateNoData />}
            editing={props.editing}
            onRemove={props.onRemove}
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
                        radiusWidth: defaultView ? 24 : 16,
                        padAngle: 0,
                    }}
                />
                <Legend
                    data={formattedData}
                    format={defaultView ? `desktop` : `mobile`}
                />
            </div>
            }
        </HomeScreenWidgetWrapper>
    );
}

export default AttendanceRateWidget;
