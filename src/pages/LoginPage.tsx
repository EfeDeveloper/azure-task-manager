import AppBackground from '@/components/AppBackground';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_USER = {
  username: 'admin',
  password: 'admin123',
};

// Background extraído a componente reutilizable AppBackground

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === MOCK_USER.username && password === MOCK_USER.password) {
      setError(null);
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('auth', '1');
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <AppBackground>
      <Container maxWidth="xs">
        <Card
          sx={(theme) => ({
            background: theme.palette.common.white,
            border: `1px solid ${theme.palette.common.white}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`,
            color: theme.palette.common.black,
          })}
        >
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
              <Typography component="h1" variant="h5" fontWeight={700} color="primary">
                Login
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                fullWidth
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
                variant="outlined"
              />
              <TextField
                margin="normal"
                fullWidth
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          aria-label="Mostrar u ocultar contraseña"
                          onClick={() => setShowPassword((s) => !s)}
                          edge="end"
                          color="primary"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {error && (
                <Typography variant="body2" color="error" mt={1}>
                  {error}
                </Typography>
              )}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
                mb={1}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                  }
                  label={
                    <Typography variant="caption" color="primary">
                      Recordarme
                    </Typography>
                  }
                />
                <Link href="#" variant="caption" underline="hover" color="primary">
                  Olvidé mi contraseña
                </Link>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 1, mb: 2 }}
              >
                Ingresar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </AppBackground>
  );
}
