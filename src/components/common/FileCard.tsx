
import { FileType } from '@/redux/slices/file';
import { Container } from '@mui/material';
import classes from "./style/common.module.css";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { getExtensionFromMimeType } from '@/utils/FileUtils';

interface Props {
  currentFile: FileType | null
}

const FileCard = ({ currentFile }: Props) => {
  if (!currentFile) {
    return <></>
  }

  return (
    <Container>
      <div className={classes.file_wrapper}>
        <Card orientation="horizontal" variant="outlined" sx={{ width: 260 }}>
          <CardOverflow>
            <AspectRatio
              ratio="1"
              // sx={{ width: 90 }}
              sx={{ width: 90, bgcolor: 'background.level2', borderRadius: 'md' }}
            >
              <img
                src="/images/icon/file_icon.png"
                srcSet="/images/icon/file_icon.png"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography textColor="primary.plainColor" sx={{ fontWeight: 'md' }}>
              {currentFile.name}
            </Typography>
            <Typography level="body-sm">{getExtensionFromMimeType(currentFile.extension)}</Typography>
          </CardContent>
          <CardOverflow
            variant="soft"
            color="primary"
            sx={{
              px: 0.2,
              writingMode: 'vertical-rl',
              justifyContent: 'center',
              fontSize: 'xs',
              fontWeight: 'xl',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              borderLeft: '1px solid',
              borderColor: 'divider',
            }}
          >
            File
          </CardOverflow>
        </Card>
      </div>
    </Container >
  );

}

export default FileCard;