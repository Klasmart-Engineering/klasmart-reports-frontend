import BarChart from "./BarChart";
import { ParentSize } from "@visx/responsive";
import NoDataMessageWrapper from "@/components/NoDataMessage";

const LearningOutcomeSummaryNoData: React.FC = () => {

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