import ProgressBar from "./ProgressBar";
import { useGetStudentLearningOutcome } from "@kl-engineering/reports-api-client";
import { FiberManualRecord } from "@mui/icons-material";
import {
    List,
    ListItem,
    Theme,
    Typography,
    useTheme,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import { sumBy } from "lodash";
import React,
{
    useEffect,
    useState,
} from "react";
import {
    FormattedMessage,
    useIntl,
} from "react-intl";

const useStyles = makeStyles((theme: Theme) => createStyles({
    widgetContent: {
        height: `100%`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `space-evenly`,
    },
    row: {
        display: `grid`,
        gridTemplateColumns: `25% 60% 10% `,
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
    text: {
        fontSize: 16,
        fontWeight: 600,
    },
    count: {
        fontSize: 24,
        fontWeight: 400,
        textAlign: `right`,
        marginRight: 10,
    },
    titleWrapper: {
        display: `flex`,
        alignItems: `center`,
    },
    title: {
        color: theme.palette.grey[600],
        fontSize: 12,
        marginLeft: 5,
        alignSelf: `flex-start`,
    },
    bullet: {
        color: theme.palette.info.light,
        fontSize: 10,
    },
    break: {
        border: `1px solid #B7B7B7`,
        width: `95%`,
        margin: `auto`,
    },
    heading: {
        textAlign: `center`,
        color: `#1896EA`,
        fontWeight: 600,
        fontSize: 14,
    },
}));
export interface AchievementData {
    intlKey: JSX.Element;
    count: number;
    color: string;
}
export default function AchievementWidget() {
    const intl = useIntl();
    const classes = useStyles();
    const theme = useTheme();
    const [total, setTotal] = useState(0);
    // const currentOrganization = useCurrentOrganization();
    // const organizationId = currentOrganization?.id ?? ``;
    // const {
    //     data,
    //     isFetching: isachievementDataFetching,
    //     error: isachievementDataError,
    //     refetch: achievementDataRefetch,
    // } = useGetStudentLearningOutcome({
    //     org: organizationId,
    // });
    const data = {
        "info": {
            "learning_outcomes": {
                "achieved": 60,
                "not_achieved": 34,
                "not_covered": 12
            },
            "skills": [
                {
                    "skill": "84b8f87a-7b61-4580-a190-a9ce3fe90dd3",
                    "skill_name": "Speech & Language Skills",
                    "achieved": 25,
                    "not_achieved": 12,
                    "total": 37
                },
                {
                    "skill": "2d5ea951-836c-471e-996e-76823a992689",
                    "skill_name": "Motor Skills",
                    "achieved": 18,
                    "not_achieved": 7,
                    "total": 25
                },
                {
                    "skill": "1080d319-8ce7-4378-9c71-a5019d6b9386",
                    "skill_name": "Speech & Language Skills",
                    "achieved": 1,
                    "not_achieved": 1,
                    "total": 2
                },
                {
                    "skill": "c12f363a-633b-4080-bd2b-9ced8d034379",
                    "skill_name": "Cognitive Skills",
                    "achieved": 7,
                    "not_achieved": 2,
                    "total": 9
                }
            ]
        },
        "lastupdate": 1653634657,
        "expiry": 1653636457,
        "successful": true
    };

    const [ achievementData, setAchievementData ] = useState<AchievementData[]>([]);
    useEffect(() => {
        const { learning_outcomes } = data?.info || {};
        if (!learning_outcomes) return;
        const generatedAchievementData = [
            {
                intlKey: <FormattedMessage id="home.student.achievementWidget.legendAchieved" />,
                count: learning_outcomes.achieved,
                color: theme.palette.info.light,
            },
            {
                intlKey: <FormattedMessage id="home.student.achievementWidget.legendPending" />,
                count: learning_outcomes.not_covered,
                color: `#9473E5`,
            },
            {
                intlKey: <FormattedMessage id="home.student.achievementWidget.legendNotAchieved" />,
                count: learning_outcomes.not_achieved,
                color: theme.palette.error.light,
            },
        ];
        setAchievementData(generatedAchievementData);
        setTotal(sumBy(generatedAchievementData, (item) => item.count));
    }, []);
    // const reload = () => {
    //     achievementDataRefetch();
    // };

    return (
        <div className={classes.widgetContent}>
            <div className={classes.titleWrapper}>
                <FiberManualRecord className={classes.bullet} />
                <Typography className={classes.title}>
                    <FormattedMessage id="home.student.achievementWidget.title" />
                </Typography>
            </div>
            {achievementData?.length &&
                <List>
                    <Typography className={classes.heading}>
                        <FormattedMessage id="home.student.achievementWidget.containerHeading" />
                    </Typography>
                    <div className={classes.break} />
                    {achievementData?.map((item, i) => {
                        return (
                            <ListItem key={i}>
                                <div
                                    className={classes.row}
                                    style={{
                                        color: item.color,
                                    }}
                                >
                                    <div
                                        className={classes.text}
                                    >
                                        {item.intlKey}
                                    </div>
                                    <div>
                                        <ProgressBar
                                            total={total}
                                            progress={item.count}
                                            color={item.color}
                                            thickness={15}
                                            backgroundColor="transparent"
                                        />
                                    </div>
                                    <div
                                        className={classes.count}
                                    >
                                        {item.count}
                                    </div>
                                </div>
                            </ListItem>);
                    })}
                    <div className={classes.break} />
                </List>
            }
        </div>
    );
}
