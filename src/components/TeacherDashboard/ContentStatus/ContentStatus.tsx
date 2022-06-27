import { WidgetType } from "../../models/widget.model";
import contentStatusDataFormatter from "./contentStatusDataFormatter";
import { useGetContentTeacher } from "@kl-engineering/reports-api-client";
import { Theme, Typography } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import { FiberManualRecord } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { useMemo } from "react";
import {
    FormattedMessage,
    useIntl,
} from "react-intl";
import { currentOrganizationState, useGlobalStateValue } from "@kl-engineering/frontend-state";
import ContentStatusNoData from "./ContentStatusNoData";
import { HomeScreenWidgetWrapper } from "@kl-engineering/kidsloop-px";
import WidgetWrapperError from "@/components/WidgetWrapper";
import { Context } from "@/components/models/widgetContext";

const useStyles = makeStyles(((theme: Theme) => createStyles({
    widgetContent: {
        height: `100%`,
        display: `grid`,
        gridTemplateColumns: `1fr`,
        gridTemplateRows: `10% 1fr`,
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
    titleBullet: {
        color: theme.palette.info.light,
        fontSize: 10,
    },
    list: {
        listStyle: `none`,
        padding: 0,
        margin: 0,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `space-around`,

    },
    listItem: {
        display: `grid`,
        gridTemplateRows: `1fr`,
        gridTemplateColumns: `45% 20% 35%`,
        alignItems: `center`,
        justifyItems: `center`,
        '&:not(:last-child)': {
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
        },
    },
    body2: {
        fontWeight: `bold`,
        justifySelf: `start`,
        paddingLeft: `1rem`,
    },
    caption: {
        justifySelf: `end`,
        paddingRight: `1rem`,
        color: theme.palette.grey[600],
    },
    count: {
        fontSize: 28,
        justifySelf: `end`,
        color: theme.palette.info.main,
    },
    countNegative: {
        color: theme.palette.error.light,
    },
})));
export interface ContentStatusWidgetProps {
    widgetContext: Context;
}

const ContentStatusWidget: React.VFC<ContentStatusWidgetProps> = (props) => {
    const classes = useStyles();
    const intl = useIntl();
    const currentOrganization = useGlobalStateValue(currentOrganizationState);
    const organizationId = currentOrganization?.id ?? ``;
    const { editing = false, removeWidget, layouts, widgets } = props.widgetContext;
    const onRemove = () => removeWidget(WidgetType.CONTENTSTATUS, widgets, layouts);

    const {
        data,
        isFetching,
        isSuccess,
        refetch,
    } = useGetContentTeacher({
        org: organizationId,
    });

    const formattedData = useMemo(() => {
        if (!data) return;
        return contentStatusDataFormatter(data);
    }, [data]);

    return (
        <HomeScreenWidgetWrapper
            label={
                intl.formatMessage({
                    id: `home.contentStatus.containerTitleLabel`,
                })
            }
            link={{
                url: `library/organization-content`,
                label: intl.formatMessage({
                    id: `home.contentStatus.containerUrlLabel`,
                }),
            }}
            loading={isFetching}
            error={!isSuccess}
            errorScreen={<WidgetWrapperError reload={refetch} />}
            noData={!data?.successful}
            noDataScreen={<ContentStatusNoData />}
            editing={editing}
            onRemove={onRemove}
        >
            <div className={classes.widgetContent}>
                <div className={classes.titleWrapper}>
                    <FiberManualRecord className={classes.titleBullet} />
                    <Typography className={classes.title}>
                        <FormattedMessage id="home.contentStatus.timeFrame" />
                    </Typography>
                </div>
                <ul className={classes.list}>
                    <li className={classes.listItem}>
                        <Typography
                            variant="body2"
                            className={classes.body2}>
                            <FormattedMessage id="home.contentStatus.learningMaterialLabel" />
                        </Typography>
                        <Typography
                            className={classes.count}>
                            {formattedData?.total}
                        </Typography>
                        <Typography
                            variant="caption"
                            className={classes.caption}
                            color="textSecondary">
                            <FormattedMessage id="home.contentStatus.timeFrame" />
                        </Typography>
                    </li>
                    <li className={classes.listItem}>
                        <Typography
                            variant="body2"
                            className={classes.body2}>
                            <FormattedMessage id="home.contentStatus.totalApprovedLabel" />
                        </Typography>
                        <Typography
                            className={classes.count}>
                            {formattedData?.approved}
                        </Typography>
                        <Typography
                            variant="caption"
                            className={classes.caption}
                            color="textSecondary">
                            <FormattedMessage id="home.contentStatus.timeFrame" />
                        </Typography>
                    </li>
                    <li className={classes.listItem}>
                        <Typography
                            variant="body2"
                            className={classes.body2}>
                            <FormattedMessage id="home.contentStatus.totalPendingLabel" />
                        </Typography>
                        <Typography
                            className={clsx(classes.count, classes.countNegative)}>
                            {formattedData?.pending}
                        </Typography>
                        <Typography
                            variant="caption"
                            className={classes.caption}>
                            <FormattedMessage id="home.contentStatus.timeFrame" />
                        </Typography>
                    </li>
                    <li className={classes.listItem}>
                        <Typography
                            variant="body2"
                            className={classes.body2}>
                            <FormattedMessage id="home.contentStatus.totalRejectedLabel" />
                        </Typography>
                        <Typography
                            className={clsx(classes.count, classes.countNegative)}>
                            {formattedData?.rejected}
                        </Typography>
                        <Typography
                            variant="caption"
                            className={classes.caption}>
                            <FormattedMessage id="home.contentStatus.timeFrame" />
                        </Typography>
                    </li>
                </ul>
            </div>
        </HomeScreenWidgetWrapper>
    );
}

export default ContentStatusWidget;
