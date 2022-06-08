import React from 'react';
import {
    createStyles,
    makeStyles,
} from "@mui/styles";
import { Theme, createTheme } from '@mui/material/styles';
import { Box, Typography } from "@mui/material";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { FormattedMessage } from "react-intl";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        messageBox: {
            width: 300,
            height: 120,
            position: `absolute`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            flexDirection: `column`,
            borderTopLeftRadius: 60,
            borderBottomRightRadius: 10,
            backgroundColor: theme.palette.common.white,
        },
        message: {
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
        }
    }));

interface Props {
    id: string;
    defaultMessage: string;
    children?: React.ReactNode;
    backdrop?: boolean;
}

export default function NoDataMessage(props: Props) {
    const classes = useStyles();
    const theme = createTheme();
    const { id, defaultMessage, children, backdrop } = props;

    return (
        <Box sx={{ position: `relative`, height: `100%` }}>
            {children}
            {backdrop &&
                <>
                    <Box
                        sx={{
                            width: `100%`,
                            height: `100%`,
                            position: `absolute`,
                            top: 0,
                            zIndex: 2,
                            borderRadius: 2,
                            backgroundColor: theme.palette.common.black,
                            opacity: 0.2
                        }} />
                    <Box
                        sx={{
                            backgroundColor: theme.palette.common.black,
                            position: `absolute`,
                            top: theme.spacing(2),
                            left: theme.spacing(2),
                            padding: theme.spacing(0.5, 2.5),
                            borderRadius: 3,
                            zIndex: 3,
                            opacity: 0.6
                        }}>
                        <Typography color={theme.palette.common.white}>
                            <FormattedMessage id="home.student.adaptiveLearningJourney.sample" defaultMessage="Sample" />
                        </Typography>
                    </Box>
                </>
            }
            <Box
                sx={{
                    right: theme.spacing(backdrop ? 0 : -2),
                    bottom: theme.spacing(backdrop ? 0 : -2),
                    boxShadow: backdrop ? `none` : `-2px -2px 10px ${theme.palette.grey[400]}`,
                    zIndex: 3,
                }}
                className={classes.messageBox}>
                <Box className={classes.message}>
                    <LightbulbIcon color="warning" />
                    <Typography fontSize={14} fontWeight={400} sx={{ width: 220, marginLeft: theme.spacing(1) }}>
                        <FormattedMessage id={id} defaultMessage={defaultMessage} />
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}