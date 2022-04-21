import { PendingAssignmentsResponse } from "@kl-engineering/reports-api-client";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React,
{ ReactElement } from "react";
import { FormattedMessage } from "react-intl";

export const THEME_COLOR_CLASS_TYPE_CLASS = `#1bade5`;
export const THEME_COLOR_CLASS_TYPE_LIVE = `#0e78d5`;
export const THEME_COLOR_CLASS_TYPE_STUDY = `#13aaa9`;
export const THEME_COLOR_CLASS_TYPE_TASK = `#afba0a`;

interface ClassTypeIdentity {
    intlKey: string | ReactElement;
    color: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    aliases?: (string| any)[];
}

const classTypeIdentities: Record<string | ClassType, ClassTypeIdentity> = {
    live: {
        intlKey: <FormattedMessage id="class.type.live" />,
        color: THEME_COLOR_CLASS_TYPE_LIVE,
        icon: LiveTvIcon,
        aliases: [ `onlineclass` ],
    },
    study: {
        intlKey: <FormattedMessage id="class.type.study" />,
        color: THEME_COLOR_CLASS_TYPE_STUDY,
        icon: LocalLibraryOutlinedIcon,
    },
    homefun: {
        intlKey: <FormattedMessage id="class.type.homeFun" />,
        color: THEME_COLOR_CLASS_TYPE_STUDY,
        icon: LocalLibraryOutlinedIcon,
        aliases: [ `homework` ],
    },
    task: {
        intlKey: <FormattedMessage id="class.type.task" />,
        color: THEME_COLOR_CLASS_TYPE_TASK,
        icon: AssignmentOutlinedIcon,
    },
    class: {
        intlKey: <FormattedMessage id="class.type.class" />,
        color: THEME_COLOR_CLASS_TYPE_CLASS,
        icon: SchoolOutlinedIcon,
        aliases: [ `offlineclass` ],
    },
};

export interface PendingAssignmentInfoFormatted {
    color: string;
    intlKey: string | ReactElement;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    classType: string;
    count: number;
}

enum ClassType {
    LIVE = `live`,
    CLASS = `class`,
    HOMEWORK = `homework`,
    STUDY = `study`
}

export default function pendingAssesmentsDataFormatter (data: PendingAssignmentsResponse): PendingAssignmentInfoFormatted[] {
    const pendingCountMap: {
        live: number;
        class: number;
        homework: number;
        study: number;
    } = {
        [ClassType.LIVE]: data?.info?.filter((item) => item.class_type === ClassType.LIVE)
            .reduce((sum: number, item) => { return sum + item.count; }, 0) || 0,
        [ClassType.CLASS]: data?.info?.filter((item) => item.class_type === ClassType.CLASS)
            .reduce((sum: number, item) => { return sum + item.count; }, 0) || 0,
        [ClassType.HOMEWORK]: data?.info?.filter((item) => item.class_type === ClassType.HOMEWORK)
            .reduce((sum: number, item) => { return sum + item.count; }, 0) || 0,
        [ClassType.STUDY]: data?.info?.filter((item) => item.class_type === ClassType.STUDY)
            .reduce((sum: number, item) => { return sum + item.count; }, 0) || 0,
    };

    const formattedData: PendingAssignmentInfoFormatted[] = [
        {
            ...classTypeIdentities.live,
            classType: ClassType.LIVE,
            count: pendingCountMap[ClassType.LIVE],
        },
        {
            ...classTypeIdentities.class,
            classType: ClassType.CLASS,
            count: pendingCountMap[ClassType.CLASS],
        },
        {
            ...classTypeIdentities.homefun,
            classType: ClassType.HOMEWORK,
            count: pendingCountMap[ClassType.HOMEWORK],
        },
        {
            ...classTypeIdentities.study,
            classType: ClassType.STUDY,
            count: pendingCountMap[ClassType.STUDY],
        },
    ];

    return formattedData;
}
