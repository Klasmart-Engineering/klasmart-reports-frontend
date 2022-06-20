import BarChart from "./BarChart";
import { useGetStudentLearningOutcome } from "@kl-engineering/reports-api-client";
import { ParentSize } from "@visx/responsive";
import { useIntl } from "react-intl";
import { currentOrganizationState, useGlobalStateValue } from "@kl-engineering/frontend-state";
import LearningOutcomeSummaryNoData from "./LearningOutcomeSummaryNoData";
import { HomeScreenWidgetWrapper } from "@kl-engineering/kidsloop-px";
import WidgetWrapperError from "@/components/WidgetWrapper/WidgetWrapperError";
import { Context } from "@/components/models/widgetContext";
import { WidgetType } from "@/components/models/widget.model";

interface Props { 
    widgetContext: Context;
 }
interface UniqueSkillConversionType {
    skill: string[];
    skill_name: string;
    achieved: number;
    not_achieved: number;
    total: number;
}
interface SkillTypeForGraph {
    skill: string;
    achieved: number;
    notAchieved: number;
}

export default function LearningOutcomeSummary(props: Props) {
    const { widgetContext } = props;
    const intl = useIntl();
    const currentOrganization = useGlobalStateValue(currentOrganizationState);
    const organizationId = currentOrganization?.id ?? ``;
    const { editing = false, removeWidget, layouts, widgets } = widgetContext;
    const onRemove = () => removeWidget(WidgetType.LEARNINGOUTCOME, widgets, layouts);

    const {
        data,
        isLoading: isLearingOutcomeLoading,
        error: isLearingOutcomeError,
        refetch,
    } = useGetStudentLearningOutcome({
        org: organizationId,
    });

    const learningOutComeData: SkillTypeForGraph[] = data?.info?.skills?.reduce((skills: UniqueSkillConversionType[], responseSkill: { skill_name: string; achieved: number; not_achieved: number; total: number; skill: string; }) => {
        const index = skills.findIndex(skill => skill.skill_name === responseSkill.skill_name);
        if (index !== -1) {
            const {
                skill_name,
                not_achieved,
                achieved,
                total,
                skill,
            } = skills[index];
            skills[index] = {
                skill_name,
                achieved: achieved + responseSkill.achieved,
                not_achieved: not_achieved + responseSkill.not_achieved,
                total: total + responseSkill.total,
                skill: [...skill, responseSkill.skill],
            };
            return skills;
        }
        return [
            ...skills,
            {
                ...responseSkill,
                skill: [responseSkill.skill],
            },
        ];
    }, [])
        .sort((previous: { total: number; }, current: { total: number; }) => current.total - previous.total)
        .slice(0, 5)
        .map((s: { skill_name: any; achieved: any; not_achieved: any; }) => ({
            skill: s.skill_name,
            achieved: s.achieved,
            notAchieved: s.not_achieved,
        })) || [];

    return (
        <HomeScreenWidgetWrapper
            label={intl.formatMessage({
                id: `home.student.learningOutcomeWidget.containerTitleLabel`,
            })}
            id={WidgetType.LEARNINGOUTCOME}
            loading={isLearingOutcomeLoading}
            error={isLearingOutcomeError}
            errorScreen={<WidgetWrapperError reload={refetch}/>}
            noData={!data?.successful}
            noDataScreen={<LearningOutcomeSummaryNoData />}
            editing={editing}
            onRemove={onRemove}
        >
            <ParentSize>
                {({ width, height }: { width: number, height: number }) => (
                    <BarChart
                        data={learningOutComeData}
                        width={width}
                        height={height}
                    />
                )}
            </ParentSize>
        </HomeScreenWidgetWrapper>
    );
}
