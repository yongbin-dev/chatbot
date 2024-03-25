import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
// import { useTheme } from '@mui/material/styles';

import LogoImg from "../assets/logo.svg?react";


// ----------------------------------------------------------------------

interface Prop {
  disabledLink: boolean,
  navigateUrl?: string,
  sx: object,
}

export default function Logo({ disabledLink = false, navigateUrl, sx }: Prop) {
  const navigate = useNavigate()

  const handleLogoButton = () => {
    if (!disabledLink || !navigateUrl) return;
    navigate(navigateUrl);
  }

  const logo = (
    <LogoImg {...sx} onClick={handleLogoButton} />
  );












































  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
