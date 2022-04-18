import { RecoilRoot } from "recoil"
import React from "react";

const StoreProvider: React.FC = (props) => {
    return (
        <RecoilRoot>
            {props.children}
        </RecoilRoot>
    )
}

export default StoreProvider;