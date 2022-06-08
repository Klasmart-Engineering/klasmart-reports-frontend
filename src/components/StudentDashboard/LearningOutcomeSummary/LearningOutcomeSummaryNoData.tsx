import BarChart from "./BarChart";
import { ParentSize } from "@visx/responsive";
import React from "react";
import NoDataMessageWrapper from "@/components/NoDataMessage/NoDataMessageWrapper";

interface Props { }

export default function LearningOutcomeSummaryNoData(props: Props) {

    const learningOutComeData = [
        {
            "skill": "Cognitive Skills",
            "achieved": 34,
            "notAchieved": 1
        },
        {
            "skill": "Subject Matter",
            "achieved": 17,
            "notAchieved": 13
        },
        {
            "skill": "Motor Skills",
            "achieved": 20,
            "notAchieved": 7
        },
        {
            "skill": "Speech & Language Skills",
            "achieved": 17,
            "notAchieved": 5
        },
        {
            "skill": "Gross Motor Skills",
            "achieved": 10,
            "notAchieved": 7
        }
    ]

    return (
        <ParentSize>
            {({ width, height }: { width: number, height: number }) => (
                <NoDataMessageWrapper 
                    id="home.student.learningOutcomeSummary.noData" 
                    defaultMessage="You will see your top 5 skills 7 days later."
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
