import { Link as RouterLink } from 'react-router-dom';
// @mui
// import { useTheme } from '@mui/material/styles';

import LogoImg from "../assets/logo.svg?react";


// ----------------------------------------------------------------------

interface Prop {
  disabledLink: boolean,
  sx: object,
}

export default function Logo({ disabledLink = false, sx }: Prop) {

  const logo = (
    <LogoImg {...sx} />
  );












































  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
