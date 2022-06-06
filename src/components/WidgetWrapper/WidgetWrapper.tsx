import WidgetWrapperError from './WidgetWrapperError';
// import WidgetWrapperNoData from './WidgetManagement/WidgetWrapperNoData';
import {
    Box,
    CircularProgress,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
    cardWrapper: {
        display: `flex`,
        flexFlow: `column`,
        height: `100%`,
    },
}));

export type BaseWidgetProps = {
    children: React.ReactNode;
    loading: boolean;
    error?: any;
    noData?: boolean;
    reload?: () => any | Promise<any>;
}

export default function WidgetWrapper (props: BaseWidgetProps) {
    const classes = useStyles();
    const {
        children,
        loading,
        error,
        noData,
        reload,
    } = props;

    return (
        <Box className={classes.cardWrapper}>
                <Box sx={
                    loading ? {
                        m: `auto`,
                        display: `flex`,
                        alignItems: `center`,
                        pointerEvents: `none`,
                    } :
                        {
                            height: `100%`,
                        }
                }
                >
                    {loading ?
                        <CircularProgress color="primary" />
                        : error ?
                            <WidgetWrapperError reload={reload} />
                            : noData ?
                                // <WidgetWrapperNoData />
                                <Box>
                                    No Data
                                </Box>
                                :
                                children
                    }
                </Box>
        </Box>
    );
}

