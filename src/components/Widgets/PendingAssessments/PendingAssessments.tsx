import createStyles from '@mui/styles/createStyles';
import React, { useMemo } from "react";
import { LinearProgress, List, ListItem, SvgIcon, Theme, Typography } from "@mui/material";
import { FormattedMessage } from 'react-intl';
import { FiberManualRecord } from "@mui/icons-material";
import pendingAssesmentsDataFormatter from './pendingAssesmentsDataFormatter';
import ProgressBar from "./ProgressBar";
import { sumBy } from 'lodash';
import { PendingAssignmentsResponse } from "@kl-engineering/reports-api-client";
import { makeStyles } from "@mui/styles";

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

interface Props { }

export default function PendingAssessments(props: Props) {

    const classes = useStyles();
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
        ]
    } as PendingAssignmentsResponse;

    const formattedData = useMemo(() => {
        if (!data) return [];
        return pendingAssesmentsDataFormatter(data);
    }, [data]);

    const total: number = sumBy(formattedData, (item) => item.count);

    return (
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
    );
}
