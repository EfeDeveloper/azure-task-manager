import AppBackground from '@/components/AppBackground';
import { Button, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function DecorativeWaves() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.32,
        mixBlendMode: 'overlay',
      }}
    >
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>
      <path d="M0 600 Q360 520 720 600 T1440 600 V900 H0 Z" fill="url(#grad)" />
      <path
        d="M0 500 Q360 440 720 520 T1440 520 V900 H0 Z"
        fill="url(#grad)"
        opacity={0.6}
      />
      <path
        d="M0 700 Q360 640 720 700 T1440 700 V900 H0 Z"
        fill="url(#grad)"
        opacity={0.4}
      />
    </svg>
  );
}

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <AppBackground>
      <DecorativeWaves />
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{
          textAlign: 'center',
          padding: { xs: 3, sm: 5 },
          maxWidth: 640,
          width: '100%',
          '& > *:not(svg)': {
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.33)',
          },
        }}
      >
        <Typography
          variant="h1"
          color="primaryWhite"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '4.5rem', sm: '6rem' },
            lineHeight: 1,
            letterSpacing: '-3px',
          }}
        >
          404
        </Typography>
        <Typography variant="h5" color="primaryWhite" fontWeight={700}>
          Oops, esa página se desvaneció entre las nubes.
        </Typography>
        <Typography
          variant="body2"
          color="primaryWhite"
          sx={{ maxWidth: 520, opacity: 0.92 }}
        >
          El recurso que buscas no existe o fue movido. Verifica la URL o regresa al
          inicio para seguir navegando.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={(theme) => ({
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 4px 16px -2px ${alpha(theme.palette.primary.dark, 0.5)}`,
              color: theme.palette.primary.contrastText,
            })}
          >
            Volver atrás
          </Button>
        </Stack>
      </Stack>
    </AppBackground>
  );
}
