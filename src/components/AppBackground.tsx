import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

/**
 * Reusable branded background with animated soft star/nebula style highlights.
 * Centralizes the gradient logic so pages (login, 404, auth flows) stay consistent.
 */
const Root = styled(Box)(({ theme }) => {
  const p = theme.palette;
  return {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    background: `linear-gradient(140deg, ${p.primary.dark} 0%, ${p.primary.main} 45%, ${p.secondary.dark} 100%)`,
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `radial-gradient(circle at 18% 28%, ${alpha(p.common.white, 0.18)}, transparent 60%),
        radial-gradient(circle at 82% 72%, ${alpha(p.common.white, 0.12)}, transparent 55%)`,
      pointerEvents: 'none',
    },
  };
});

export default function AppBackground({ children }: PropsWithChildren) {
  return <Root>{children}</Root>;
}
