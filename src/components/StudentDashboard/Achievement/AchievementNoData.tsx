import ProgressBar from "./ProgressBar";
import NoDataMessageWrapper from "@/components/NoDataMessage";
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
import {
    useEffect,
    useState,
} from "react";
import clsx from "clsx";
import { FormattedMessage } from "react-intl";
import { getAuthEndpoint } from "@/config";

const useStyles = makeStyles((theme: Theme) => createStyles({
    widgetContent: {
        height: `100%`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `space-evenly`,
    },
    row: {
        display: `grid`,
        gridTemplateColumns: `25% 55% 10% `,
        gridTemplateRows: `1fr`,
        gridColumnGap: theme.spacing(1.25),
        alignItems: `center`,
        width: `100%`,
        marginBottom: theme.spacing(1.25),
    },
    rowHighLighted: {
        boxShadow: `2px 2px 10px ${theme.palette.grey[400]}`,
        borderRadius: theme.spacing(1.5),
        border: `none`,
        padding: theme.spacing(1)
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
        border: `1px solid ${theme.palette.grey[400]}`,
        width: `95%`,
        margin: `auto`,
    },
    heading: {
        textAlign: `center`,
        color: theme.palette.info.light,
        fontWeight: 600,
        fontSize: 14,
    },
}));
export interface AchievementData {
    intlKey: JSX.Element;
    count: number;
    color: string;
}
const AchievementNoData: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [total, setTotal] = useState(0);

    const [achievementData, setAchievementData] = useState<AchievementData[]>([]);
    useEffect(() => {
        const generatedAchievementData = [
            {
                intlKey: <FormattedMessage id="home.student.achievementWidget.legendAchieved" />,
                count: 60,
                color: theme.palette.info.light,
            },
            {
                intlKey: <FormattedMessage id="home.student.achievementWidget.legendPending" />,
                count: 12,
                color: `#9473E5`,
            },
            {
                intlKey: <FormattedMessage id="home.student.achievementWidget.legendNotAchieved" />,
                count: 34,
                color: theme.palette.error.light,
            },
        ];
        setAchievementData(generatedAchievementData);
        setTotal(sumBy(generatedAchievementData, (item) => item.count));
    }, []);

    return (
        <NoDataMessageWrapper
            id="home.student.achievements.noData"
        >
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
                                <ListItem key={i}
                                    sx={{
                                        padding: i === 0 ? theme.spacing(0.5) : theme.spacing(0, 2)
                                    }}>
                                    <div
                                        className={clsx(classes.row, {
                                            [classes.rowHighLighted]: !i
                                        })}
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
        </NoDataMessageWrapper>
    );
}

export default AchievementNoData;
