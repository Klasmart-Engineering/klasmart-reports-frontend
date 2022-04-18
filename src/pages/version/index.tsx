import React from "react";

export interface VersionPageProps {
}

export default function VersionPage (props: VersionPageProps) {
    const obj = {
        GIT_COMMIT: process.env.GIT_COMMIT,
        VERSION: process.env.VERSION,
    };

    return (
        <pre>{JSON.stringify(obj, null, 2)}</pre>
    );
}
