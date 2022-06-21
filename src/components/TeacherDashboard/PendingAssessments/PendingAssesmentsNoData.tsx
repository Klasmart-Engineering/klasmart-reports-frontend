import pendingAssesmentsDataFormatter from "./pendingAssesmentsDataFormatter";
import ProgressBar from "./ProgressBar";
import { Grid, List, ListItem, SvgIcon, Theme, Typography, useTheme, lighten } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import { FiberManualRecord } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { sumBy } from "lodash";
import NoDataMessageWrapper from "@/components/NoDataMessage";
import { useMemo } from "react";
import {
    FormattedMessage,
    useIntl,
} from "react-intl";

const useStyles = makeStyles((theme: Theme) => createStyles({
    widgetContent: {
        height: `100%`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
    },
    row: {
        display: `grid`,
        gridTemplateColumns: `30% 1fr`,
        gridTemplateRows: `1fr`,
        gridColumnGap: theme.spacing(1.25),
        alignItems: `center`,
        width: `100%`,
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

const PendingAssessmentsNoData: React.FC = () => {
    const intl = useIntl();
    const classes = useStyles();
    const theme = useTheme();

    const data = {
        "info": [
            {
                "class_type": "class",
                "count": 14
            },
            {
                "class_type": "live",
                "count": 25
            },
            {
                "class_type": "homework",
                "count": 4
            }
        ],
        "lastupdate": 1654762530,
        "expiry": 1654764330,
        "successful": true
    }

    const formattedData = useMemo(() => {
        if (!data) return [];
        return pendingAssesmentsDataFormatter(data);
    }, []);

    const total: number = sumBy(formattedData, (item) => item.count);

    return (
        <NoDataMessageWrapper
            id="home.teacher.pendingAssesments.noData"
            buttonLink="#/schedule"
            buttonName={intl.formatMessage({ id: `home.teacher.noDataStatus.scheduleClass` })}
        >
            <div className={classes.widgetContent}>
                <div className={classes.titleWrapper}>
                    <FiberManualRecord className={classes.bullet} />
                    <Typography className={classes.title}>
                        <FormattedMessage id="home.pendingAssessments.title" />
                    </Typography>
                </div>
                {formattedData &&
                    <Grid container sx={{ width: `100%` }} spacing={theme.spacing(1)}>
                        <Grid
                            item
                            xs={5}>
                            <Typography
                                fontSize={12}
                                sx={{
                                    color: theme.palette.info.main,
                                    marginLeft: theme.spacing(1)
                                }}>
                                <FormattedMessage id="home.teacher.pendingAssesments.classType" />
                            </Typography>
                            <List
                                sx={{
                                    backgroundColor: lighten(theme.palette.info.dark, 0.8),
                                    borderRadius: 3,
                                    padding: 0
                                }}>
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
                                        </div>
                                    </ListItem>;
                                })}
                            </List>
                        </Grid>
                        <Grid item xs={7}>
                        <Typography
                                fontSize={12}
                                sx={{
                                    color: theme.palette.info.main,
                                    marginLeft: theme.spacing(1)
                                }}>
                                <FormattedMessage id="home.teacher.pendingAssesments.assesmentsToComplete" />
                            </Typography>
                            <List
                                sx={{
                                    border: `2px solid ${theme.palette.grey[300]}`,
                                    borderRadius: 3,
                                }}
                            >
                                {formattedData.map((item, index: number) => {
                                    return <ListItem key={index}>
                                        <div className={classes.row} style={{ gridTemplateColumns: `15% 1fr` }}>
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
                        </Grid>
                    </Grid>
                }
            </div>
        </NoDataMessageWrapper>
    );
}

export default PendingAssessmentsNoData;