import { AlertTitle } from '@mui/material';
import Alert from '@mui/material/Alert';

enum AlertType {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error",
}

interface Props {
  msg: string,
  type?: AlertType
}

const CommonAlert = ({ type = AlertType.Success, msg }: Props) => {
  return (
    <Alert severity={type}>
      <AlertTitle>Success</AlertTitle>
      {msg}
    </Alert>
  )
}

export default CommonAlert