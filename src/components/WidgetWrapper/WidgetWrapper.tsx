import WidgetWrapperError from './WidgetWrapperError';
import {
    Box,
    Card,
    CircularProgress,
} from '@mui/material';
import { Theme, createTheme } from '@mui/material/styles';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `space-between`,
        borderRadius: 10,
        boxShadow: `none`,
        height: `100%`,
        backgroundColor: `unset`,
        padding: theme.spacing(2),
    },
    noData: {
        backgroundColor: theme.palette.grey[200],
    },
    noBackground: {
        backgroundColor: `unset`,
    }
}));

export type BaseWidgetProps = {
    children: React.ReactNode;
    loading: boolean;
    error?: any;
    noData?: boolean;
    reload?: () => any | Promise<any>;
    noDataScreen?: any;
    noBackground?: boolean;
}

export default function WidgetWrapper(props: BaseWidgetProps) {
    const classes = useStyles();
    const theme = createTheme();
    const {
        children,
        loading,
        error,
        noData,
        reload,
        noDataScreen,
        noBackground
    } = props;

    return (
        <Box sx={
            loading ? {
                m: `auto`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                pointerEvents: `none`,
            } :
                {
                    height: `100%`,
                    position: `relative`,
                }
        }
        >
            <Card
                className={`${classes.card} ${noData && classes.noData} ${noBackground && classes.noBackground}`}
            >
                {loading ?
                    <CircularProgress color="primary" />
                    : error ?
                        <WidgetWrapperError reload={reload} />
                        : noData ?
                            noDataScreen
                            :
                            children
                }
            </Card>
        </Box>
    );
}

