import React from "react";
import { RecoilRoot } from "recoil";

const StoreProvider: React.FC = (props) => {
    return (
        <RecoilRoot>
            {props.children}
        </RecoilRoot>
    );
};

export default StoreProvider;
