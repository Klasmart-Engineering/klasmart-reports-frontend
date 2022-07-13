import BarChart from "../BarChart/BarChart";
import { ParentSize } from "@visx/responsive";
import NoDataMessageWrapper from "@/components/NoDataMessage";
import { useIntl } from "react-intl";
import React from "react";

const LearningOutcomeSummaryNoData: React.FC = () => {
    const intl = useIntl();

    const learningOutComeData = [
        {
            "skill": intl.formatMessage({
                id: `home.student.learningOutcomeWidget.skill1`,
            }),
            "achieved": 34,
            "notAchieved": 1,
        },
        {
            "skill": intl.formatMessage({
                id: `home.student.learningOutcomeWidget.skill2`,
            }),
            "achieved": 17,
            "notAchieved": 13,
        },
        {
            "skill": intl.formatMessage({
                id: `home.student.learningOutcomeWidget.skill3`,
            }),
            "achieved": 20,
            "notAchieved": 7,
        },
        {
            "skill": intl.formatMessage({
                id: `home.student.learningOutcomeWidget.skill4`,
            }),
            "achieved": 17,
            "notAchieved": 5,
        },
        {
            "skill": intl.formatMessage({
                id: `home.student.learningOutcomeWidget.skill5`,
            }),
            "achieved": 10,
            "notAchieved": 7,
        },
    ]

    return (
        <ParentSize>
            {({ width, height }: { width: number, height: number }) => (
                <NoDataMessageWrapper 
                    id="home.student.learningOutcomeSummary.noData" 
                >
                    <BarChart
                        data={learningOutComeData}
                        width={width}
                        height={height}
                    />
                </NoDataMessageWrapper>
            )}
        </ParentSize>
    );
}

export default LearningOutcomeSummaryNoData;
