import { Box, Typography } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">Bienvenido. Aquí irán tus tareas Azure.</Typography>
    </Box>
  );
}
