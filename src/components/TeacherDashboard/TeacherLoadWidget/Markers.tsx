import { useTheme } from "@mui/material";

const TeacherLoadWidgetMarkers: React.VFC = () => {
    
    const theme = useTheme();

    return (
        <defs>
            <marker id="arrow" viewBox="0 0 10 10"
                refX="1" refY="5"
                markerUnits="strokeWidth"
                markerWidth="7" markerHeight="7"
                orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={theme.palette.primary.main} />
            </marker>
            <marker id="circle" viewBox="0 0 10 10"
                refX="5" refY="5"
                markerUnits="strokeWidth"
                markerWidth="7" markerHeight="7"
                orient="auto">
                <circle cy="5" cx="5" r="5" fill={theme.palette.primary.main} />
            </marker>
        </defs>
    )
}

export default TeacherLoadWidgetMarkers;
