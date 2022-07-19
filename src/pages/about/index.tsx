import { Box, Typography } from "@mui/material";

interface AboutPageProps {
}

const AboutPage: React.VFC<AboutPageProps> = (props) => {
    return (
        <Box>
            <Typography>About</Typography>
            <Box style={{
                backgroundColor: `#ff000040`,
            }}>
                <Typography>
                    Reports widgets for Student and Teacher dashboard in the HUB.
                </Typography>
            </Box>
        </Box>
    );
}

export default AboutPage;
