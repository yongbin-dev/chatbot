import { Link as RouterLink } from 'react-router-dom';
// @mui
// import { useTheme } from '@mui/material/styles';

import LogoImg from "../assets/logo.svg?react";


// ----------------------------------------------------------------------

interface Prop {
  disabledLink: boolean,
  sx: object ,
}

export default function Logo({ disabledLink = false, sx } : Prop ) {
  // const theme = useTheme();
  // const PRIMARY_LIGHT = theme.palette.primary.light;
  // const PRIMARY_MAIN = theme.palette.primary.main;
  // const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
      <LogoImg width={200} height={200}/>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
