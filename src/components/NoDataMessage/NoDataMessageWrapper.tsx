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
        backdrop: {
            width: `100%`,
            height: `100%`,
            position: `absolute`,
            top: 0,
            zIndex: 2,
            borderRadius: theme.spacing(1.25),
            backgroundColor: theme.palette.common.black,
            opacity: 0.2
        },
        sampleBox: {
            backgroundColor: theme.palette.common.black,
            position: `absolute`,
            top: theme.spacing(2),
            left: theme.spacing(2),
            borderRadius: theme.spacing(2),
            zIndex: 3,
            opacity: 0.6,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            width: 120,
            height: 45,
            [theme.breakpoints.down(`sm`)]: {
                width: 70,
                height: 35,
                borderRadius: theme.spacing(1.5),
            }
        },
        sampleText: {
            fontSize: 22,
            [theme.breakpoints.down(`sm`)]: {
                fontSize: 14
            }
        },
        messageBox: {
            width: 350,
            padding: theme.spacing(3),
            position: `absolute`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            flexDirection: `column`,
            border: `1px solid ${theme.palette.grey[200]}`,
            borderTopLeftRadius: 40,
            borderBottomRightRadius: theme.spacing(1.25),
            backgroundColor: theme.palette.common.white,
            [theme.breakpoints.down(`sm`)]: {
                width: `80%`,
                padding: theme.spacing(2.5),
            },
        },
        message: {
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
        },
        messageText: {
            fontSize: 16,
            width: `80%`, 
            marginLeft: theme.spacing(1),
            [theme.breakpoints.down(`sm`)]: {
                width: `90%`,
                fontSize: 12,
            },
        }
    }));

export interface NoDataMessageWrapperProps {
    id: string;
    defaultMessage?: string;
    children?: React.ReactNode;
    backdrop?: boolean;
    buttonLink?: string;
    buttonName?: string;
}

const NoDataMessageWrapper: React.FC<NoDataMessageWrapperProps> = (props) => {
    const classes = useStyles();
    const theme = createTheme();

    return (
        <Box sx={{ position: `relative`, height: `100%` }}>
            {props.children}
            {props.backdrop &&
                <>
                    <Box className={classes.backdrop}/>
                    <Box className={classes.sampleBox}>
                        <Typography color={theme.palette.common.white} className={classes.sampleText} fontWeight={700}>
                            <FormattedMessage id="home.student.adaptiveLearningJourneyNoData.sample" />
                        </Typography>
                    </Box>
                </>
            }
            <Box
                sx={{
                    right: theme.spacing(props.backdrop ? 0 : -2),
                    bottom: theme.spacing(props.backdrop ? 0 : -2),
                    boxShadow: props.backdrop ? `none` : `1px 1px 10px ${theme.palette.grey[600]}`,
                    zIndex: 3,
                }}
                className={classes.messageBox}>
                <Box className={classes.message}>
                    <img src={lightBulb} alt="bulb" width={15} />
                    <Typography color={theme.palette.common.black} className={classes.messageText} fontWeight={400}>
                        <FormattedMessage id={props.id} defaultMessage={props.defaultMessage} />
                    </Typography>
                </Box>
                {props.buttonLink &&
                    <Link
                        underline="none"
                        href={props.buttonLink}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 3,
                            marginTop: theme.spacing(1),
                            padding: theme.spacing(1, 2.5),
                            minWidth: 140,
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
                            {props.buttonName}
                        </Typography>
                    </Link>
                }
            </Box>
        </Box>
    )
}

export default NoDataMessageWrapper;
