import pendingAssesmentsDataFormatter from "./pendingAssesmentsDataFormatter";
import ProgressBar from "./ProgressBar/ProgressBar";
import { useGetPendingAssignments } from "@kl-engineering/reports-api-client";
import { List, ListItem, SvgIcon, Theme, Typography } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import { FiberManualRecord } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { sumBy } from "lodash";
import { useMemo } from "react";
import {
    FormattedMessage,
    useIntl,
} from "react-intl";
import { currentOrganizationState, useGlobalStateValue } from "@kl-engineering/frontend-state";
import PendingAssessmentsNoData from "./PendingAssessmentsNoData";
import { HomeScreenWidgetWrapper } from "@kl-engineering/kidsloop-px";
import { Context } from "@/components/models/widgetContext";
import { WidgetType } from "@/components/models/widget.model";
import WidgetWrapperError from "@/components/WidgetWrapperError";
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
    widgetContent: {
        height: `100%`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
    },
    row: {
        display: `grid`,
        gridTemplateColumns: `15% 30% 15% 1fr`,
        [theme.breakpoints.down(`xs`)]: {
            gridTemplateColumns: `15% 1fr 15%`,
        },
        gridTemplateRows: `1fr`,
        gridColumnGap: theme.spacing(1.25),
        alignItems: `center`,
        width: `100%`,
        marginBottom: theme.spacing(1.25),
    },
    rowIcon: {
        color: theme.palette.getContrastText(theme.palette.text.primary),
        borderRadius: `100%`,
        padding: 5,
        fontSize: 35,
    },
    progressBar: {
        [theme.breakpoints.down(`xs`)]: {
            display: `none`,
        },
    },
    text: {
        fontSize: 14,
        color: theme.palette.text.primary,
    },
    titleWrapper: {
        display: `flex`,
        alignItems: `center`,
        marginTop: 18,
    },
    title: {
        color: theme.palette.grey[600],
        fontSize: 12,
        marginLeft: 5,
    },
    bullet: {
        color: theme.palette.info.light,
        fontSize: 10,
    },
}));
export interface PendingAssessmentsWidgetProps {
    widgetContext: Context;
}

const PendingAssessmentsWidget: React.FC<PendingAssessmentsWidgetProps> = (props) => {
    const intl = useIntl();
    const classes = useStyles();
    const currentOrganization = useGlobalStateValue(currentOrganizationState);
    const organizationId = currentOrganization?.id ?? ``;
    const { editing = false, removeWidget, layouts, widgets } = props.widgetContext;
    const onRemove = () => removeWidget(WidgetType.PENDINGASSESSMENTS, widgets, layouts);

    const {
        data,
        isFetching,
        isSuccess,
        refetch,
    } = useGetPendingAssignments({
        org: organizationId,
    });

    const formattedData = useMemo(() => {
        if (!data) return [];
        return pendingAssesmentsDataFormatter(data);
    }, [data]);

    const total: number = sumBy(formattedData, (item) => item.count);

    return (
        <HomeScreenWidgetWrapper
            label={
                intl.formatMessage({
                    id: `home.pendingAssessments.containerTitleLabel`,
                })
            }
            link={{
                url: `#/assessments`,
                label: intl.formatMessage({
                    id: `home.pendingAssessments.containerUrlLabel`,
                }),
            }}
            loading={isFetching}
            error={!isSuccess}
            errorScreen={<WidgetWrapperError reload={refetch} />}
            noData={!data?.successful}
            noDataScreen={<PendingAssessmentsNoData />}
            editing={editing}
            onRemove={onRemove}
        >
            <div className={classes.widgetContent}>
                <div className={classes.titleWrapper}>
                    <FiberManualRecord className={classes.bullet} />
                    <Typography className={classes.title}>
                        <FormattedMessage id="home.pendingAssessments.title" />
                    </Typography>
                </div>
                {formattedData &&
                    <List>
                        {formattedData.map((item, index: number) => {
                            return <ListItem key={index}>
                                <div className={classes.row}>
                                    <SvgIcon
                                        component={item.icon}
                                        className={classes.rowIcon}
                                        style={{
                                            backgroundColor: item.color,
                                        }} />
                                    <div className={classes.text}>
                                        {item.intlKey}
                                    </div>
                                    <div
                                        className={classes.text}
                                        style={{
                                            color: item.color,
                                            fontSize: 24,
                                        }}>
                                        {item.count}
                                    </div>
                                    <div className={classes.progressBar}>
                                        <ProgressBar
                                            total={total}
                                            progress={item.count}
                                            color={item.color}
                                            thickness={15}
                                        />
                                    </div>
                                </div>
                            </ListItem>;
                        })}
                    </List>
                }
            </div>
        </HomeScreenWidgetWrapper>
    );
}

export default PendingAssessmentsWidget;
