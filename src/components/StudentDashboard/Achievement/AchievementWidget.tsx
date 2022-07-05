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
import { currentOrganizationState, useGlobalStateValue } from "@kl-engineering/frontend-state";
import AchievementNoData from "./AchievementNoData";
import { HomeScreenWidgetWrapper } from "@kl-engineering/kidsloop-px";
import WidgetWrapperError from "@/components/WidgetWrapper";
import { WidgetType } from "@/components/models/widget.model";
import { Context } from "@/components/models/widgetContext";

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
export interface AchievementWidgetProps {
    widgetContext: Context;
}

const AchievementWidget: React.FC<AchievementWidgetProps> = (props) => {
    const intl = useIntl();
    const classes = useStyles();
    const theme = useTheme();
    const [total, setTotal] = useState(0);
    const currentOrganization = useGlobalStateValue(currentOrganizationState);
    const organizationId = currentOrganization?.id ?? ``;
    const { editing = false, removeWidget, layouts, widgets } = props.widgetContext;
    const onRemove = () => removeWidget(WidgetType.ACHIEVEMENT, widgets, layouts);

    const {
        data,
        isFetching: isachievementDataFetching,
        refetch: achievementDataRefetch,
        isSuccess: isachievementDataSuccess,
    } = useGetStudentLearningOutcome({
        org: organizationId,
    });

    const [achievementData, setAchievementData] = useState<AchievementData[]>([]);
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
    }, [data]);
    const reload = () => {
        achievementDataRefetch();
    };

    return (
        <HomeScreenWidgetWrapper
            label={
                intl.formatMessage({
                    id: `home.student.achievementWidget.containerTitleLabel`,
                })
            }
            loading={isachievementDataFetching}
            error={!isachievementDataSuccess}
            errorScreen={<WidgetWrapperError reload={reload} />}
            noData={!data?.successful}
            noDataScreen={<AchievementNoData />}
            editing={editing}
            onRemove={onRemove}
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
        </HomeScreenWidgetWrapper>
    );
}

export default AchievementWidget;
