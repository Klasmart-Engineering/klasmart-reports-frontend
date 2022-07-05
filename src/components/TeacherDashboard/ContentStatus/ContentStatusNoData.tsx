import contentStatusDataFormatter from "./contentStatusDataFormatter";
import { Theme, Typography, useTheme } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import { FiberManualRecord } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { useMemo } from "react";
import {
    FormattedMessage,
    useIntl,
} from "react-intl";
import NoDataMessageWrapper from "@/components/NoDataMessage";

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
        padding: theme.spacing(0, 0.5),
        '&:not(:last-child):not(:first-child)': {
            borderBottom: `2px solid ${theme.palette.grey[300]}`,
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

const ContentStatusNoData: React.VFC = () => {
    const classes = useStyles();
    const intl = useIntl();
    const theme = useTheme();

    const data = {
        "info": {
            "total": 3,
            "draft": 4,
            "published": 12,
        },
        "lastupdate": 1654762431,
        "expiry": 1654764231,
        "successful": true,
    }

    const formattedData = useMemo(() => {
        if (!data) return;
        return contentStatusDataFormatter(data);
    }, []);

    return (
        <NoDataMessageWrapper
            id="home.teacher.contentStatus.noData"
            buttonLink="#/library/organization-content"
            buttonName={intl.formatMessage({ id : `home.teacher.contentStatus.createLessonPlan` })}
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
                    <li
                        className={classes.listItem}
                        style={{
                            boxShadow: `2px 2px 10px ${theme.palette.grey[400]}`,
                            borderRadius: theme.spacing(1.5),
                            border: `none`,
                            padding: theme.spacing(1, 0)
                        }}>
                        <Typography
                            variant="body2"
                            className={classes.body2}
                            fontSize={16}>
                            <FormattedMessage id="home.contentStatus.totalApprovedLabel" />
                        </Typography>
                        <Typography
                            className={classes.count}
                            fontSize={20}>
                            {formattedData?.approved}
                        </Typography>
                        <Typography
                            variant="caption"
                            className={classes.caption}
                            color="textSecondary"
                            fontSize={13}>
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
        </NoDataMessageWrapper>
    );
}

export default ContentStatusNoData;
