import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface Props {
  isOpenModelDescriptionDialog: boolean;
  setIsOpenModelDescriptionDialog: (open: boolean) => void;
}

export default function ChatModelDescriptionDialog({
  isOpenModelDescriptionDialog,
  setIsOpenModelDescriptionDialog,
}: Props) {

  if (!isOpenModelDescriptionDialog) return;

  const handleClose = () => {
    setIsOpenModelDescriptionDialog(false);
  }

  return (
    <Modal
      open={isOpenModelDescriptionDialog}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 750 }}>
        <div style={{
          marginBottom: '20px'
        }}>
          <div>
            <Link
              href="https://platform.openai.com/docs/concepts"
              underline="none"
              target="_blank"
            >
              GPT
            </Link>
          </div>
          <div>
            <Link
              href="https://docs.anthropic.com/en/docs/about-claude/models#model-names"
              underline="none"
              target="_blank"
            >
              CLAUDE
            </Link></div>
        </div>
        <div>
          <img src={"/images/claude_model_description.png"}></img>
        </div>
      </Box>
    </Modal>
  );
}
