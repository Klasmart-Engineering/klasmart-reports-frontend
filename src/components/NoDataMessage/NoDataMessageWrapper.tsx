import React from 'react';
import {
    createStyles,
    makeStyles,
} from "@mui/styles";
import { Theme, createTheme } from '@mui/material/styles';
import { Box, Link, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import lightBulb from "@/assets/img/bulb.png";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        messageBox: {
            width: 350,
            padding: theme.spacing(3),
            position: `absolute`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            flexDirection: `column`,
            borderTopLeftRadius: 40,
            borderBottomRightRadius: 10,
            backgroundColor: theme.palette.common.white,
            [theme.breakpoints.down(`sm`)]: {
                width: `80%`,
            },
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
    buttonLink?: string;
    buttonName?: string;
}

export default function NoDataMessage(props: Props) {
    const classes = useStyles();
    const theme = createTheme();
    const { id, defaultMessage, children, backdrop, buttonLink, buttonName } = props;

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
                    <img src={lightBulb} alt="bulb" width={15}/>
                    <Typography fontSize={14} fontWeight={400} sx={{ width: `80%`, marginLeft: theme.spacing(1) }}>
                        <FormattedMessage id={id} defaultMessage={defaultMessage} />
                    </Typography>
                </Box>
                {buttonLink &&
                    <Link
                        underline="none"
                        href={buttonLink}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 3,
                            marginTop: theme.spacing(1),
                            padding: theme.spacing(1, 2.5),
                            minWidth: 150,
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            fontWeight={400}
                            fontSize={14}
                            sx={{
                                color: theme.palette.common.white,
                            }}
                        >
                            {buttonName}
                        </Typography>
                    </Link>
                }
            </Box>
        </Box>
    )
}