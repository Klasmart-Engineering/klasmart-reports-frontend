import { GlobalStateProvider } from '@kl-engineering/frontend-state';
import React from "react";

const StoreProvider: React.FC = (props) => {
    return (
        <GlobalStateProvider cookieDomain={process.env.COOKIE_DOMAIN ?? ``}>
            {props.children}
        </GlobalStateProvider>
    )
}

export default StoreProvider;