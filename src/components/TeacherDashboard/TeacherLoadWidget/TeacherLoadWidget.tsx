import { WidgetType } from "../../models/widget.model";
import { usePostSchedulesTimeViewList } from "@kl-engineering/cms-api-client";
import { useClassTeacherLoad } from "@kl-engineering/reports-api-client";
import {
    Theme,
    Typography,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from "@mui/styles";
import React,
{
    useEffect,
    useState,
} from "react";
import {
    FormattedMessage,
    useIntl,
} from "react-intl";

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
        gridTemplateColumns: `50% 25% 25%`,
        alignItems: `center`,
        justifyItems: `center`,
        backgroundColor: theme.palette.grey[100],
        padding: `1.1rem 0 1.1rem 0`,
        borderRadius: `0.5rem`,
    },
    body2: {
        fontWeight: `bold`,
        justifySelf: `start`,
        paddingLeft: `1.5rem`,
    },
    caption: {
        justifySelf: `start`,
        paddingRight: `1rem`,
        color: theme.palette.grey[700],
    },
    count: {
        fontSize: 28,
        justifySelf: `center`,
        color: theme.palette.info.main,
    },
})));

export default function TeacherLoadWidget() {
    const classes = useStyles();

    const [totalClasses, setTotalClasses] = useState<(number)>(0);
    const [totalStudents, setTotalStudents] = useState<(number)>(0);
    const [upcomingClasses, setUpcomingClasses] = useState<(number)>(0);
    // const intl = useIntl();
    // const currentOrganization = useCurrentOrganization();
    // const organizationId = currentOrganization?.id ?? ``;

    // const now = new Date();
    // const unixStartOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
    //     .getTime();
    // const unixNext7daysIncludeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 59)
    //     .getTime();
    // const timeZoneOffset = now.getTimezoneOffset() * 60 * -1; // to make seconds
    // const {
    //     data: teacherData,
    //     isFetching: isTeacherDataFetching,
    //     error: isTeacherDataError,
    //     refetch: teacherDataRefetch,
    // } = useClassTeacherLoad({
    //     org: organizationId,
    // });

    // const {
    //     data: schedulesData,
    //     isFetching: isSchedulesFetching,
    //     isError: isScheduleError,
    //     refetch: scheduleDataRefetch,
    // } = usePostSchedulesTimeViewList({
    //     org_id: organizationId,
    //     view_type: `full_view`,
    //     time_at: 0, // any time is ok together with view_type=`full_view`,
    //     start_at_ge: (unixStartOfDay / 1000),
    //     end_at_le: (unixNext7daysIncludeToday / 1000),
    //     time_zone_offset: timeZoneOffset,
    //     order_by: `start_at`,
    //     time_boundary: `union`,
    // }, {
    //     queryOptions: {
    //         enabled: !!organizationId,
    //     },
    // });

    const teacherData = {
        "info": [
            {
                "school_id": "9027f845-d124-48b8-9924-58e9d6ccf1b1",
                "class_id": "830f5318-e055-43b3-9fc2-abdd3d77377e",
                "studnum": 4
            }
        ],
        "lastupdate": 1653900678,
        "expiry": 1653902478,
        "successful": true
    }

    const schedulesData = {
        "total": 3,
        "data": [
            {
                "id": "62947a26b59ef3a06eb959de",
                "title": "Test",
                "start_at": 1653897900,
                "end_at": 1653898800,
                "due_at": 0,
                "class_type": "OnlineClass",
                "status": "Closed",
                "class_id": "4f839919-2502-4cf7-b372-79c32a811029",
                "is_home_fun": false,
                "is_review": false,
                "review_status": "",
                "content_start_at": 0,
                "content_end_at": 0,
                "is_repeat": false,
                "is_hidden": false,
                "lesson_plan_id": "60b5dba474bcb0773ad23bf7",
                "role_type": "Teacher",
                "exist_feedback": false,
                "is_locked_lesson_plan": true,
                "assessment_status": "",
                "created_at": 1653897766
            },
            {
                "id": "629479dbb59ef3a06eb9596a",
                "title": "Pradeep",
                "start_at": 1653901200,
                "end_at": 1653904800,
                "due_at": 0,
                "class_type": "OfflineClass",
                "status": "NotStart",
                "class_id": "1a4cbef2-f836-476e-9a2d-2de7b5ee089a",
                "is_home_fun": false,
                "is_review": false,
                "review_status": "",
                "content_start_at": 0,
                "content_end_at": 0,
                "is_repeat": false,
                "is_hidden": false,
                "lesson_plan_id": "60a316cc03b03c3acdb54b54",
                "role_type": "Teacher",
                "exist_feedback": false,
                "is_locked_lesson_plan": false,
                "assessment_status": "",
                "created_at": 1653897691
            },
            {
                "id": "62947b37b59ef3a06eb95aae",
                "title": "Live",
                "start_at": 1653908400,
                "end_at": 1653912000,
                "due_at": 0,
                "class_type": "OnlineClass",
                "status": "NotStart",
                "class_id": "1a4cbef2-f836-476e-9a2d-2de7b5ee089a",
                "is_home_fun": false,
                "is_review": false,
                "review_status": "",
                "content_start_at": 0,
                "content_end_at": 0,
                "is_repeat": false,
                "is_hidden": false,
                "lesson_plan_id": "60a316cc03b03c3acdb54b54",
                "role_type": "Teacher",
                "exist_feedback": false,
                "is_locked_lesson_plan": false,
                "assessment_status": "",
                "created_at": 1653898039
            }
        ]
    }

    useEffect(() => {
        if (!teacherData || teacherData.info === undefined) return;

        setTotalClasses(teacherData.info.reduce((sum: number, item) => { if (item.class_id !== ``) return ++sum; }, 0) || 0);
        setTotalStudents(teacherData.info.reduce((sum: number, item) => { return sum + item.studnum; }, 0));

        if (!schedulesData?.total) return;

        setUpcomingClasses(schedulesData.total);

    }, [teacherData, schedulesData]);

    return (
        <div className={classes.widgetContent}>
            <ul className={classes.list}>
                <li className={classes.listItem}>
                    <Typography
                        variant="body2"
                        className={classes.body2}
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
                        className={classes.caption}
                        color="textSecondary"
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
    );
}
