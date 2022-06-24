import {
    Box,
    Theme,
    Typography,
    useTheme,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from "@mui/styles";
import React from "react";
import {
    FormattedDate,
    FormattedMessage,
} from "react-intl";
import NoDataMessageWrapper from "@/components/NoDataMessage";

const useStyles = makeStyles(((theme: Theme) => createStyles({
    widgetContent: {
        height: `100%`,
        display: `grid`,
        gridTemplateColumns: `1fr`,
        gridTemplateRows: `1fr`,
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
        gridTemplateColumns: `50% 20% 30%`,
        alignItems: `center`,
        justifyItems: `center`,
        backgroundColor: theme.palette.grey[300],
        padding: `1.1rem 0 1.1rem 0`,
        borderRadius: `0.5rem`,
    },
    body2: {
        fontWeight: 600,
        justifySelf: `start`,
        marginLeft: `1.5rem`,
    },
    caption: {
        justifySelf: `start`,
        paddingRight: `0.5rem`,
        color: theme.palette.grey[700],
    },
    count: {
        fontSize: 28,
        justifySelf: `center`,
        color: theme.palette.info.main,
    },
})));

const TeacherLoadNoData: React.VFC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const totalClasses = 26;
    const totalStudents = 87;
    const upcomingClasses = 30;
    const now = new Date();
    const unixStartOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
        .getTime();
    const unixNext7daysIncludeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 59)
        .getTime();

    return (
        <NoDataMessageWrapper
            id="home.teacher.teacherLoad.noData"
        >
            <div className={classes.widgetContent}>
                <Box
                    sx={{
                        display: `flex`,
                        width: `100%`,
                        position: `absolute`,
                        alignItems: `center`,
                        justifyContent: `space-between`,
                        top: theme.spacing(-2),
                    }}>
                    <Typography fontSize={14} fontWeight={600} letterSpacing={-0.5} color={theme.palette.info.main} marginLeft={theme.spacing(6)}>
                        <FormattedMessage id="home.teacher.teacherLoad.list"/>
                    </Typography>
                    <Typography fontSize={14} fontWeight={600} letterSpacing={-0.5} color={theme.palette.info.main}>
                        <FormattedMessage id="home.teacher.teacherLoad.lastUpdate"/>
                    </Typography>
                </Box>
                <ul className={classes.list}>
                    <li className={classes.listItem}>
                        <Typography
                            variant="body2"
                            marginLeft={`0.5rem`}
                            fontWeight={600}
                            padding={theme.spacing(1)}
                            borderRadius={3}
                            justifySelf={`start`}
                            boxShadow={`2px 2px 10px ${theme.palette.grey[400]}`}
                        >
                            <FormattedMessage id="home.teacherLoad.totalClassesLabel" />
                        </Typography>
                        <Typography
                            className={classes.count}
                        >
                            {totalClasses}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            marginLeft={`0.5rem`}
                            fontWeight={600}
                            padding={theme.spacing(1)}
                            borderRadius={3}
                            justifySelf={`start`}
                            boxShadow={`2px 2px 10px ${theme.palette.grey[400]}`}
                        >
                            <FormattedMessage id="home.teacherLoad.totalClassesTimeFrame" />
                        </Typography>
                    </li>
                    <li className={classes.listItem}>
                        <Typography
                            variant="body2"
                            className={classes.body2}
                        >
                            <FormattedMessage id="home.teacherLoad.totalStudentsLabel" />
                        </Typography>
                        <Typography
                            className={classes.count}
                        >
                            {totalStudents}
                        </Typography>
                        <Typography
                            variant="caption"
                            className={classes.caption}
                            color="textSecondary"
                        >
                            <FormattedMessage id="home.teacherLoad.totalStudentsTimeFrame" />
                        </Typography>
                    </li>
                    <li className={classes.listItem}>
                        <Typography
                            variant="body2"
                            className={classes.body2}
                        >
                            <FormattedMessage id="home.teacherLoad.upcomingClassesLabel" />
                            <Typography fontWeight="normal">
                                <FormattedDate
                                    value={unixStartOfDay}
                                    month="long"
                                    day="2-digit"
                                    children={(date: Date) => `${date} - `}
                                />
                                <FormattedDate
                                    value={unixNext7daysIncludeToday}
                                    month="long"
                                    day="2-digit"
                                />
                            </Typography>
                        </Typography>
                        <Typography
                            className={classes.count}
                        >
                            {upcomingClasses}
                        </Typography>
                        <Typography
                            variant="caption"
                            className={classes.caption}
                            color="textSecondary"
                        >
                            <FormattedMessage id="home.teacherLoad.upcomingClassesTimeFrame" />
                        </Typography>
                    </li>
                </ul>
            </div>
        </NoDataMessageWrapper>
    );
}

export default TeacherLoadNoData;