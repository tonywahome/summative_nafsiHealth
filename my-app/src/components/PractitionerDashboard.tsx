import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import {
    Person as PersonIcon,
    Event as EventIcon,
    Assignment as AssignmentIcon,
    Timeline as TimelineIcon,
} from '@mui/icons-material';

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
        <Box display="flex" alignItems="center" mb={2}>
            {icon}
            <Typography variant="h6" ml={1}>
                {title}
            </Typography>
        </Box>
        <Typography variant="h4">{value}</Typography>
    </Paper>
);

const PractitionerDashboard: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Welcome, Dr. Smith
            </Typography>

            <Grid container spacing={3}>
                {/* Dashboard Cards */}
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard
                        title="Total Patients"
                        value="156"
                        icon={<PersonIcon color="primary" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard
                        title="Today's Appointments"
                        value="8"
                        icon={<EventIcon color="primary" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard
                        title="Pending Reports"
                        value="12"
                        icon={<AssignmentIcon color="primary" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard
                        title="Weekly Patients"
                        value="45"
                        icon={<TimelineIcon color="primary" />}
                    />
                </Grid>

                {/* Main Content Area */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Upcoming Appointments
                        </Typography>
                        {/* Add appointment list or table component here */}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Recent Patient Activity
                        </Typography>
                        {/* Add recent activity list component here */}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Tasks & Reminders
                        </Typography>
                        {/* Add tasks list component here */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PractitionerDashboard;